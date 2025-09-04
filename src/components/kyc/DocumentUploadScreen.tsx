import { useState, useRef } from "react";
import { ArrowLeft, Upload, Camera, FileText, CheckCircle2, AlertCircle, X } from "lucide-react";
import { KYCMethod } from "../KYCApp";

interface DocumentUploadScreenProps {
  onNext: () => void;
  onBack: () => void;
  method?: KYCMethod;
  onDocumentsUpload: (documents: File[]) => void;
}

interface DocumentType {
  id: string;
  name: string;
  required: boolean;
  file?: File;
}

export const DocumentUploadScreen = ({ 
  onNext, 
  onBack, 
  method, 
  onDocumentsUpload 
}: DocumentUploadScreenProps) => {
  const [documents, setDocuments] = useState<DocumentType[]>([
    { id: "aadhaar", name: "Aadhaar Card", required: true },
    { id: "pan", name: "PAN Card", required: true },
    { id: "additional", name: "Additional Document", required: false }
  ]);
  
  const [uploading, setUploading] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [currentDocId, setCurrentDocId] = useState<string>("");

  const handleFileSelect = (docId: string) => {
    setCurrentDocId(docId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && currentDocId) {
      setUploading(currentDocId);
      
      // Simulate upload delay
      setTimeout(() => {
        setDocuments(prev => 
          prev.map(doc =>
            doc.id === currentDocId ? { ...doc, file } : doc
          )
        );
        setUploading(null);
      }, 1500);
    }
  };

  const removeDocument = (docId: string) => {
    setDocuments(prev =>
      prev.map(doc =>
        doc.id === docId ? { ...doc, file: undefined } : doc
      )
    );
  };

  const handleNext = () => {
    const uploadedFiles = documents.filter(doc => doc.file).map(doc => doc.file!);
    onDocumentsUpload(uploadedFiles);
    onNext();
  };

  const requiredDocsUploaded = documents.filter(doc => doc.required).every(doc => doc.file);
  const allRequiredCount = documents.filter(doc => doc.required).length;
  const uploadedRequiredCount = documents.filter(doc => doc.required && doc.file).length;

  if (method === "digilocker") {
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-muted-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-semibold text-foreground">
              Connect with DigiLocker
            </h1>
            <p className="text-sm text-muted-foreground">
              Access your digital documents securely
            </p>
          </div>
        </div>

        {/* DigiLocker Integration */}
        <div className="kyc-card text-center py-12">
          <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
            <FileText className="w-8 h-8 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-card-foreground mb-2">
            DigiLocker Authorization
          </h3>
          <p className="text-sm text-muted-foreground mb-6">
            We will digitally access your Aadhaar and PAN card information
          </p>
          
          <button className="kyc-button-primary w-full mb-4">
            Connect with DigiLocker
          </button>
          
          <p className="text-xs text-muted-foreground">
            This is a secure and instant process
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-secondary rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-muted-foreground" />
        </button>
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Upload Documents
          </h1>
          <p className="text-sm text-muted-foreground">
            {uploadedRequiredCount}/{allRequiredCount} required documents uploaded
          </p>
        </div>
      </div>

      {/* Upload Guidelines */}
      <div className="bg-warning-light rounded-lg p-4 border border-warning/20">
        <div className="flex items-start space-x-2">
          <AlertCircle className="w-5 h-5 text-warning mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-warning-foreground text-sm mb-1">
              Please note before uploading
            </h4>
            <ul className="text-xs text-warning-foreground/80 space-y-1">
              <li>• Photo should be clear and readable</li>
              <li>• Complete document should be visible</li>
              <li>• File size should be less than 5MB</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Document Upload Cards */}
      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="kyc-card">
            <div className="space-y-4">
              {/* Document Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    doc.file ? "bg-success text-success-foreground" :
                    uploading === doc.id ? "bg-warning text-warning-foreground" :
                    "bg-muted text-muted-foreground"
                  }`}>
                    {doc.file ? (
                      <CheckCircle2 className="w-5 h-5" />
                    ) : uploading === doc.id ? (
                      <div className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <FileText className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium text-card-foreground flex items-center space-x-2">
                      <span>{doc.name}</span>
                      {doc.required && (
                        <span className="text-destructive text-xs">*</span>
                      )}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {doc.file ? `Uploaded: ${doc.file.name}` : 
                       uploading === doc.id ? "Uploading..." :
                       "Take photo or select file"}
                    </p>
                  </div>
                </div>
                
                {doc.file && (
                  <button
                    onClick={() => removeDocument(doc.id)}
                    className="p-1 hover:bg-destructive-light rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-destructive" />
                  </button>
                )}
              </div>

              {/* Upload Actions */}
              {!doc.file && uploading !== doc.id && (
                <div className="flex space-x-3">
                  <button
                    onClick={() => handleFileSelect(doc.id)}
                    className="flex-1 kyc-button-secondary flex items-center justify-center space-x-2"
                  >
                    <Camera className="w-4 h-4" />
                    <span>Take Photo</span>
                  </button>
                  <button
                    onClick={() => handleFileSelect(doc.id)}
                    className="flex-1 kyc-button-secondary flex items-center justify-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>Select File</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Continue Button */}
      <button
        onClick={handleNext}
        disabled={!requiredDocsUploaded}
        className={`w-full py-4 px-6 rounded-lg font-semibold transition-all ${
          requiredDocsUploaded
            ? "kyc-button-primary"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        Continue
      </button>
    </div>
  );
};