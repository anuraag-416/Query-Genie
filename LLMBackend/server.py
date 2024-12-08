from flask import Flask, request, jsonify
# from extras.chat_generator import *
from flask_cors import CORS
from custom_db_llm_connector import *
from urllib.parse import quote
from ragdb_connector import *
openai_api_key = "sk-s72MEB57cNAt-QMq_-g1Rl5BLG-8_mgc5lK4Ne22dET3BlbkFJIVrm1sd7jwPUtuTykE8jdwAc4N0Nn8wf_a2E0lGegA"
import json
app = Flask(__name__)
CORS(app)
rag_db_connector = DatabaseConnector(
    db_type="mysql",
    username="root",
    password="rootroot",
    host="localhost",
    port=3306,
    database="ragdb"
)

def uri_constructor(db_details):
    _, _, db_name, dialect, db_username, db_password, db_host, _, _, _, _, _ = db_details

    encoded_username = quote(db_username)
    encoded_password = quote(db_password)

    db_uri = f"{dialect}://{encoded_username}:{encoded_password}@{db_host}/{db_name}"
    return db_uri
@app.route('/populateAnswer', methods=['POST'])
def answer_query():
    try:
        llm_config = {
            "type":"openai",
            "api_key":openai_api_key,
            "model":"gpt-3.5-turbo"
        }
        response = jsonify({'status': 'processing'})
        response.status_code = 202

        data = request.get_json()
        query = data['newQuery']
        query_id = query['query_id']
        query_ques = query['query_ques']
        db_id = query['db_id']

        get_db_config_query = f"Select * FROM database_config WHERE id = {db_id};"

        results = rag_db_connector.execute_query(get_db_config_query) 

        selected_db_uri = uri_constructor(results[0])
        #llm call
        # output = run_query(query)
        db_config = {
            "db_type":results[0][3],
            "db_uri": selected_db_uri
        }
        print("dynamic db config result:", db_config)
        query_ques ="heres is the context about the db based on that answer below quetsion if its a formal question answer formally\n question is "+query_ques
        output = run_custom_db_llm_query(db_config,llm_config,query_ques)
        print("output ----->",output)
        update_query = f"UPDATE query SET answer = {json.dumps(output["output"])} WHERE query_id = {query_id};"
        rag_db_connector.execute_query(update_query)
        return output
    except Exception as e:
        # Return an error message if something goes wrong
        print("error ----->",e)
        update_query = f"UPDATE query SET answer = 'error_resp' WHERE query_id = {query_id};"
        rag_db_connector.execute_query(update_query)
        return jsonify({'error': str(e)}), 202
    
@app.route('/ping')
def ping():
    print('ping pong....:)')
    return jsonify({'ping': 'pong'}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=5000, debug=True)