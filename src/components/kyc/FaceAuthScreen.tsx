import { useState, useRef } from "react";
import { ArrowLeft, Camera, CheckCircle2, AlertTriangle, RotateCcw } from "lucide-react";

interface FaceAuthScreenProps {
  onNext: () => void;
  onBack: () => void;
  onFaceCapture: (faceImage: File) => void;
}

type CaptureState = "idle" | "capturing" | "captured" | "processing" | "success" | "retry";

export const FaceAuthScreen = ({ onNext, onBack, onFaceCapture }: FaceAuthScreenProps) => {
  const [captureState, setCaptureState] = useState<CaptureState>("idle");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const instructions = [
    "📱 फोन को आंखों के सामने सीधा रखें",
    "💡 अच्छी रोशनी में बैठें",
    "😊 प्राकृतिक चेहरे के भाव रखें",
    "👓 चश्मा हटाने की आवश्यकता नहीं"
  ];

  const handleStartCapture = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCaptureState("processing");
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Simulate processing
      setTimeout(() => {
        setCaptureState("success");
        onFaceCapture(file);
      }, 2000);
    }
  };

  const handleRetry = () => {
    setCaptureState("idle");
    setCapturedImage(null);
  };

  const handleNext = () => {
    if (captureState === "success") {
      onNext();
    }
  };

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
            चेहरे की पहचान
          </h1>
          <p className="text-sm text-muted-foreground">
            लाइवनेस चेक और फेस मैच के लिए
          </p>
        </div>
      </div>

      {/* Instructions */}
      {captureState === "idle" && (
        <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
          <h3 className="font-medium text-primary mb-3 text-sm">
            📋 निर्देश
          </h3>
          <div className="space-y-2">
            {instructions.map((instruction, index) => (
              <p key={index} className="text-xs text-primary/80">
                {instruction}
              </p>
            ))}
          </div>
        </div>
      )}

      {/* Capture Area */}
      <div className="kyc-card">
        <div className="text-center py-8">
          {captureState === "idle" && (
            <>
              <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-dashed border-border">
                <Camera className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-card-foreground mb-2">
                अपना फोटो लें
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                सेल्फी कैमरा का उपयोग करके अपना फोटो लें
              </p>
              <button
                onClick={handleStartCapture}
                className="kyc-button-primary"
              >
                कैमरा खोलें
              </button>
            </>
          )}

          {captureState === "processing" && (
            <>
              {capturedImage && (
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-warning">
                  <img 
                    src={capturedImage} 
                    alt="Captured face" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-5 h-5 border-2 border-warning border-t-transparent rounded-full animate-spin" />
                <span className="text-warning font-medium">वेरिफाई हो रहा है...</span>
              </div>
              <p className="text-sm text-muted-foreground">
                कृपया प्रतीक्षा करें, हम आपकी पहचान की जांच कर रहे हैं
              </p>
            </>
          )}

          {captureState === "success" && (
            <>
              {capturedImage && (
                <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4 border-4 border-success">
                  <img 
                    src={capturedImage} 
                    alt="Verified face" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <div className="flex items-center justify-center space-x-2 mb-4">
                <CheckCircle2 className="w-6 h-6 text-success" />
                <span className="text-success font-semibold">सफलतापूर्वक वेरिफाई!</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                आपकी पहचान की पुष्टि हो गई है
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={handleRetry}
                  className="kyc-button-secondary flex items-center space-x-2"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>दोबारा लें</span>
                </button>
              </div>
            </>
          )}

          {captureState === "retry" && (
            <>
              <div className="w-32 h-32 bg-destructive-light rounded-full flex items-center justify-center mx-auto mb-6 border-4 border-destructive">
                <AlertTriangle className="w-12 h-12 text-destructive" />
              </div>
              <h3 className="text-lg font-semibold text-destructive mb-2">
                कुछ गलत हुआ
              </h3>
              <p className="text-sm text-muted-foreground mb-6">
                कृपया दोबारा कोशिश करें और निर्देशों का पालन करें
              </p>
              <button
                onClick={handleRetry}
                className="kyc-button-primary"
              >
                दोबारा कोशिश करें
              </button>
            </>
          )}
        </div>
      </div>

      {/* Security Note */}
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <CheckCircle2 className="w-5 h-5 text-success mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-medium text-card-foreground text-sm mb-1">
              सुरक्षा जानकारी
            </h4>
            <p className="text-xs text-muted-foreground">
              आपका फोटो एन्क्रिप्टेड है और केवल वेरिफिकेशन के लिए उपयोग होगा। 
              यह किसी तीसरे पक्ष के साथ साझा नहीं किया जाएगा।
            </p>
          </div>
        </div>
      </div>

      {/* Hidden File Input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleFileChange}
        className="hidden"
      />

      {/* Continue Button */}
      <button
        onClick={handleNext}
        disabled={captureState !== "success"}
        className={`w-full py-4 px-6 rounded-lg font-semibold transition-all ${
          captureState === "success"
            ? "kyc-button-primary"
            : "bg-muted text-muted-foreground cursor-not-allowed"
        }`}
      >
        पूर्ण करें
      </button>
    </div>
  );
};