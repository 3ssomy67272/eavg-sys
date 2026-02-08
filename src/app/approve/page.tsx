
"use client";

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle, ExternalLink, Copy, AlertCircle, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

function ApproveContent() {
  const searchParams = useSearchParams();
  const [countdown, setCountdown] = useState(2);
  const [copied, setCopied] = useState(false);
  
  // Get username from URL parameter
  const username = searchParams.get('username');
  
  // Fixed templates from PRD (cannot be overridden)
  const TITLE_TEMPLATE = "Your EgyptAir Application Update!";
  const BODY_TEMPLATE = `
  
  ![Welcome EAVG|820x168](upload://xNuKpTNhFEPi9s0FCG5RLjaiMI1.png)
  
  **Welcome Captain @{username}**
Welcome to the EgyptAir Virtual Group (VG) application results! We're excited that you're interested in joining the Our community.  

We have just reviewed your application to join the VA, and we're pleased to inform you that your application has been approved..!

The next step is to join our Discord server via [this link](https://discord.gg/7cXJ4MXB). this server's where we chat, participate in group flights, and host events there. This is the only way to join our community, so we recommend creating a Discord account if you don’t already have one.  

Once you've joined the server:  
1. Get access to the server by clicking the green button in **#:mag:verify༄** channel and complete a small task provided by the bot.  
2.after that, Proceed to the **#Ticket** channel, create ticket, and a staff member will contact you shortly to set you up.  

That’s it!
We can’t wait to see you there, Captain. ;)  

Let us know if you need help by replying to this message!`;

  // Construct the IFC URL
  const constructIFCUrl = () => {
    if (!username) return null;
    
    // Replace username placeholder in body template
    const body = BODY_TEMPLATE.replace('{username}', username);
    
    // Build the final IFC URL with encoded parameters
    const baseUrl = 'https://community.infiniteflight.com/new-message';
    const params = new URLSearchParams({
      username: username,
      title: TITLE_TEMPLATE,
      body: body
    });
    
    return `${baseUrl}?${params.toString()}`;
  };
  
  const ifcUrl = constructIFCUrl();
  
  // Auto-redirect logic
  useEffect(() => {
    if (!ifcUrl) return;
    
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = ifcUrl;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [ifcUrl]);

  const handleCopy = () => {
    if (ifcUrl) {
      navigator.clipboard.writeText(ifcUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // Error state - missing username
  if (!username) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center border-t-4 border-red-500">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-3 rounded-full">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Invalid Approval Link</h1>
          <p className="text-gray-600 mb-6">
            This approval link is missing the applicant username. 
            Please check the Discord notification and try again.
          </p>
          <button 
            onClick={() => window.close()}
            className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-4 rounded transition duration-200"
          >
            Close Window
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#042C64] to-[#0a4a9e] p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-4 rounded-full">
            <CheckCircle className="w-12 h-12 text-green-500" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-[#042C64] mb-2">Redirecting to IFC</h1>
        <p className="text-gray-600 mb-6">
          Redirecting to Infinite Flight Community in <span className="font-bold text-[#042C64] text-xl">{countdown}</span> seconds...
        </p>

        <div className="space-y-3">
          <a 
            href={ifcUrl || '#'} 
            className="flex items-center justify-center w-full bg-[#042C64] hover:bg-[#063d8a] text-white font-bold py-4 px-6 rounded-lg transition duration-200 group"
          >
            <span>Click here if not redirected</span>
            <ExternalLink className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </a>

          <button 
            onClick={handleCopy}
            className={cn(
              "flex items-center justify-center w-full font-semibold py-3 px-6 rounded-lg border-2 transition duration-200",
              copied 
                ? "bg-green-50 border-green-500 text-green-700" 
                : "bg-white border-gray-200 text-gray-700 hover:border-[#042C64] hover:text-[#042C64]"
            )}
          >
            <Copy className="w-5 h-5 mr-2" />
            {copied ? "Link Copied!" : "Copy Link Instead"}
          </button>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-100">
          <img 
            src="https://i.postimg.cc/hPJ4n8nJ/logo.png" 
            alt="EgyptAir Virtual" 
            className="h-10 mx-auto opacity-80"
          />
        </div>
      </div>
    </div>
  );
}

export default function ApprovePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-[#042C64]">
        <Loader2 className="w-12 h-12 text-white animate-spin" />
      </div>
    }>
      <ApproveContent />
    </Suspense>
  );
}
