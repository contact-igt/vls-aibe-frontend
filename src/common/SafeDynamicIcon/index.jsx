import React, { Component } from 'react';
import { DynamicIcon } from "lucide-react/dynamic";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.warn("Could not load Lucide icon:", error);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <span className="fallback-icon" style={{ display: 'inline-block', width: this.props.size || 24, height: this.props.size || 24, background: '#eee', borderRadius: '50%' }} />;
    }
    return this.props.children;
  }
}

const SafeDynamicIconInner = ({ name, size, color, fallback }) => {
  if (!name) return fallback || <span style={{ display: 'inline-block', width: size || 24, height: size || 24 }} />;
  
  return (
    <ErrorBoundary fallback={fallback} size={size}>
      <DynamicIcon name={name} size={size} color={color} />
    </ErrorBoundary>
  );
};

import dynamic from 'next/dynamic';
export const SafeDynamicIcon = dynamic(() => Promise.resolve(SafeDynamicIconInner), { ssr: false });
