import pymysql, os, json

# read JSON file which is in the next parent folder
#Login Attempt logfile directory
script_dir = os.path.dirname(__file__) #<-- absolute dir the script is in
rel_path = "logs/loginattempt.log"
file = os.path.join(script_dir, rel_path)

json_data=open(file).read()
json_obj = json.loads(json_data)

#Acquisition Attempt log file directory
script_dir2 = os.path.dirname(__file__)
rel_path2 = "../../logs/acquisitionattempt.log"
file2 = os.path.join(script_dir2, rel_path2)
print(file2)

json_data2=open(file2).read()
json_obj2 = json.loads(json_data2)
print(json_obj2)

# does validation and checks before insert
def validate_string(val):
   if val != None:
        if type(val) is int:
            for x in val:
               print(x)
            return str(val).encode('utf-8')
        else:
            return val


# connect to MySQL
con = pymysql.connect(host = 'localhost',user = 'root',passwd = 'password',db = 'rawrs')
cursor = con.cursor()


# parse json data to SQL insert for Login Attempt
for i, item in enumerate(json_obj):
    login_timestamp = validate_string(item.get("login_timestamp", None))
    status = validate_string(item.get("status", None))
    student_id = validate_string(item.get("student_id", None))

# parse json data to SQL insert for Acquisition Attempt
for i, item in enumerate(json_obj2):
    start_time = validate_string(item.get("start_time", None))
    finished_time = validate_string(item.get("finished_time", None))
    status2 = validate_string(item.get("status", None))
    file_name = validate_string(item.get("file_name", None))
    file_ext = validate_string(item.get("file_ext", None))
    url = validate_string(item.get("url", None))
    http_code = validate_string(item.get("http_code", None))
    student_id2 = validate_string(item.get("student_id", None))
    course_id = validate_string(item.get("course_id", None))


cursor.execute("INSERT INTO acquisitionattempt (start_time, finished_time, status, file_name," +
                " file_ext, url, http_code, student_id, course_id) VALUES (%s,	%s,	%s, %s,	%s,	%s, %s,	%s,	%s)", (start_time, finished_time, status2, file_name, file_ext, url, http_code, student_id2, course_id))
cursor.execute("INSERT INTO loginattempt (login_timestamp,	status,	student_id) VALUES (%s,	%s,	%s)", (login_timestamp,	status,	student_id))
con.commit()
con.close()

#End