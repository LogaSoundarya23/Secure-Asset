
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import hashlib

app = FastAPI(title="TechMove SecureAsset API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "TechMove SecureAsset backend is working"}

@app.get("/health")
def health():
    return {"status": "healthy"}

@app.post("/verify-file")
async def verify_file(file: UploadFile = File(...)):
    content = await file.read()
    file_hash = hashlib.sha256(content).hexdigest()

    return {
        "filename": file.filename,
        "file_size_bytes": len(content),
        "sha256_hash": file_hash,
        "message": "File hash generated successfully"
    }
