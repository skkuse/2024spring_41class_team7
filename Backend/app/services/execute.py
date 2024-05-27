import subprocess
import time
from fastapi import HTTPException

def execute_java_code(java_code: str):
    with open("TempJavaProgram.java", "w") as file:
        file.write(java_code)
    
    compile_process = subprocess.run(["javac", "TempJavaProgram.java"], capture_output=True, text=True)
    
    if compile_process.returncode != 0:
        raise HTTPException(status_code=400, detail=f"Compilation failed: {compile_process.stderr}")
    
    start_time = time.time()
    execute_process = subprocess.run(["java", "TempJavaProgram"], capture_output=True, text=True)
    end_time = time.time()
    
    if execute_process.returncode != 0:
        raise HTTPException(status_code=400, detail=f"Execution failed: {execute_process.stderr}")
    
    execution_time = end_time - start_time
    #print(f"Java execution time: {execution_time} seconds")
    
    return execute_process.stdout, execution_time
