
import React from 'react';
import { Leaf, Github, ExternalLink } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-muted/50 pt-12 pb-6 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="max-w-md">
            <div className="flex items-center gap-2 mb-3">
              <div className="bg-primary rounded-lg p-1.5">
                <Leaf className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-semibold">FarmCare</span>
            </div>
            <p className="text-muted-foreground">
              An advanced AI-powered solution for detecting and managing diseases in banana and papaya leaves.
              Designed to help farmers improve crop health and productivity.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-medium mb-3">Features</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/prediction" className="text-muted-foreground hover:text-primary transition-colors">
                    Disease Detection
                  </a>
                </li>
                <li>
                  <a href="/notes" className="text-muted-foreground hover:text-primary transition-colors">
                    Notes & Records
                  </a>
                </li>
                <li>
                  <a href="/history" className="text-muted-foreground hover:text-primary transition-colors">
                    History Tracking
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-medium mb-3">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    Documentation
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    API
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-1">
                    Github
                    <Github className="w-3 h-3" />
                  </a>
                </li>
              </ul>
            </div>

            <div className="col-span-2 md:col-span-1">
              <h3 className="font-medium mb-3">About</h3>
              <p className="text-muted-foreground">
                FarmCare is designed to help farmers diagnose and treat plant diseases quickly and efficiently.
                Our mission is to improve agricultural practices through accessible technology.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-4 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} FarmCare. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors text-sm">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
