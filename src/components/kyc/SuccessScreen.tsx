import { CheckCircle, Download, Share2, Home } from "lucide-react";
import { KYCData } from "../KYCApp";

interface SuccessScreenProps {
  data: KYCData;
}

export const SuccessScreen = ({ data }: SuccessScreenProps) => {
  const verificationId = `KYC${Date.now().toString().slice(-6)}`;
  
  const handleDownload = () => {
    // Simulate certificate download
    console.log("Downloading KYC certificate...");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "मेरा KYC सफल!",
        text: `मैंने अपना डिजिटल KYC पूरा कर लिया है। वेरिफिकेशन ID: ${verificationId}`,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center py-8">
      {/* Success Animation */}
      <div className="text-center mb-8">
        <div className="w-24 h-24 bg-success rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
          <CheckCircle className="w-12 h-12 text-success-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-success mb-2">
          🎉 बधाई हो!
        </h1>
        <p className="text-muted-foreground text-sm px-4">
          आपका KYC सफलतापूर्वक पूरा हो गया है
        </p>
      </div>

      {/* Verification Details */}
      <div className="kyc-card mb-6">
        <div className="text-center space-y-4">
          <div className="bg-success-light rounded-lg p-4">
            <h3 className="font-semibold text-success mb-2">
              वेरिफिकेशन पूर्ण
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">वेरिफिकेशन ID:</span>
                <span className="font-mono font-semibold text-card-foreground">{verificationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">विधि:</span>
                <span className="font-medium text-card-foreground">
                  {data.method === "digilocker" ? "DigiLocker" : "दस्तावेज़ अपलोड"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">समय:</span>
                <span className="font-medium text-card-foreground">
                  {new Date().toLocaleDateString("hi-IN")} {new Date().toLocaleTimeString("hi-IN", { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What's Next */}
      <div className="kyc-card mb-6">
        <h3 className="font-semibold text-card-foreground mb-4 text-center">
          अब क्या?
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-medium text-sm text-card-foreground">तुरंत उपयोग करें</p>
              <p className="text-xs text-muted-foreground">आप अब सभी सेवाओं का उपयोग कर सकते हैं</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-success-foreground" />
            </div>
            <div>
              <p className="font-medium text-sm text-card-foreground">प्रमाण पत्र डाउनलोड करें</p>
              <p className="text-xs text-muted-foreground">भविष्य के संदर्भ के लिए सेव करें</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-3">
        <button
          onClick={handleDownload}
          className="w-full kyc-button-primary flex items-center justify-center space-x-2"
        >
          <Download className="w-5 h-5" />
          <span>प्रमाण पत्र डाउनलोड करें</span>
        </button>
        
        <div className="flex space-x-3">
          <button
            onClick={handleShare}
            className="flex-1 kyc-button-secondary flex items-center justify-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>साझा करें</span>
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex-1 kyc-button-secondary flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>होम</span>
          </button>
        </div>
      </div>

      {/* Support Info */}
      <div className="text-center mt-8 px-4">
        <p className="text-xs text-muted-foreground mb-2">
          समस्या है? हमसे संपर्क करें
        </p>
        <div className="flex justify-center space-x-4 text-xs">
          <button className="text-primary hover:underline">
            📞 हेल्पलाइन
          </button>
          <button className="text-primary hover:underline">
            💬 चैट सपोर्ट
          </button>
          <button className="text-primary hover:underline">
            📧 ईमेल
          </button>
        </div>
      </div>
    </div>
  );
};