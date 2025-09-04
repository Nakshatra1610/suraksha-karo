import { Shield, CheckCircle, Clock, Users } from "lucide-react";

interface WelcomeScreenProps {
  onNext: () => void;
}

export const WelcomeScreen = ({ onNext }: WelcomeScreenProps) => {
  const features = [
    {
      icon: Shield,
      title: "सुरक्षित वेरिफिकेशन",
      description: "आपकी जानकारी पूर्णतः सुरक्षित है",
      color: "text-success"
    },
    {
      icon: Clock,
      title: "केवल 2 मिनट",
      description: "तेज़ और आसान प्रक्रिया",
      color: "text-warning"
    },
    {
      icon: Users,
      title: "10 लाख+ उपयोगकर्ता",
      description: "भरोसेमंद सेवा",
      color: "text-primary"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col justify-center py-8">
      {/* Hero Logo */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 bg-primary rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Shield className="w-10 h-10 text-primary-foreground" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">
          डिजिटल KYC
        </h1>
        <p className="text-muted-foreground text-sm px-4">
          आपकी पहचान की पुष्टि करें - आसान, तेज़ और सुरक्षित
        </p>
      </div>

      {/* Features */}
      <div className="space-y-4 mb-8">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div key={index} className="kyc-card flex items-center space-x-4 hover:shadow-lg transition-shadow">
              <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center ${feature.color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-card-foreground text-sm">{feature.title}</h3>
                <p className="text-muted-foreground text-xs">{feature.description}</p>
              </div>
              <CheckCircle className="w-5 h-5 text-success" />
            </div>
          );
        })}
      </div>

      {/* Trust Indicators */}
      <div className="bg-success-light rounded-lg p-4 mb-8 border border-success/20">
        <div className="flex items-center space-x-2 mb-2">
          <Shield className="w-5 h-5 text-success" />
          <span className="text-success font-medium text-sm">सरकारी मान्यता प्राप्त</span>
        </div>
        <p className="text-success-foreground/80 text-xs">
          यह सेवा डिजिटल इंडिया और आधार के साथ एकीकृत है
        </p>
      </div>

      {/* CTA Button */}
      <button
        onClick={onNext}
        className="kyc-button-primary w-full text-lg font-semibold"
      >
        शुरू करें
      </button>

      {/* Footer */}
      <p className="text-center text-xs text-muted-foreground mt-6 px-4">
        आगे बढ़कर आप हमारी{" "}
        <span className="text-primary">नियम और शर्तें</span> स्वीकार करते हैं
      </p>
    </div>
  );
};