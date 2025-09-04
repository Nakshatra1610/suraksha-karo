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
        title: "My KYC Successful!",
        text: `I have completed my digital KYC. Verification ID: ${verificationId}`,
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
          🎉 Congratulations!
        </h1>
        <p className="text-muted-foreground text-sm px-4">
          Your KYC has been completed successfully
        </p>
      </div>

      {/* Verification Details */}
      <div className="kyc-card mb-6">
        <div className="text-center space-y-4">
          <div className="bg-success-light rounded-lg p-4">
            <h3 className="font-semibold text-success mb-2">
              Verification Complete
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Verification ID:</span>
                <span className="font-mono font-semibold text-card-foreground">{verificationId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Method:</span>
                <span className="font-medium text-card-foreground">
                  {data.method === "digilocker" ? "DigiLocker" : "Document Upload"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Time:</span>
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
          What's Next?
        </h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <p className="font-medium text-sm text-card-foreground">Use Immediately</p>
              <p className="text-xs text-muted-foreground">You can now use all services</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-muted rounded-lg">
            <div className="w-8 h-8 bg-success rounded-lg flex items-center justify-center">
              <Download className="w-5 h-5 text-success-foreground" />
            </div>
            <div>
              <p className="font-medium text-sm text-card-foreground">Download Certificate</p>
              <p className="text-xs text-muted-foreground">Save for future reference</p>
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
          <span>Download Certificate</span>
        </button>
        
        <div className="flex space-x-3">
          <button
            onClick={handleShare}
            className="flex-1 kyc-button-secondary flex items-center justify-center space-x-2"
          >
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
          <button
            onClick={() => window.location.reload()}
            className="flex-1 kyc-button-secondary flex items-center justify-center space-x-2"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
        </div>
      </div>

      {/* Support Info */}
      <div className="text-center mt-8 px-4">
        <p className="text-xs text-muted-foreground mb-2">
          Having problems? Contact us
        </p>
        <div className="flex justify-center space-x-4 text-xs">
          <button className="text-primary hover:underline">
            📞 Helpline
          </button>
          <button className="text-primary hover:underline">
            💬 Chat Support
          </button>
          <button className="text-primary hover:underline">
            📧 Email
          </button>
        </div>
      </div>
    </div>
  );
};