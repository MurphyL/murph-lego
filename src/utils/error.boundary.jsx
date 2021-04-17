import React from 'react';

class ErrorBoundary extends React.Component {
    
    state = { 
        hasError: false, 
        error: null 
    };

    static getDerivedStateFromError(error) {
        return {
            hasError: true,
            error
        };
    }
    
    render() {
        if (this.state.hasError) {
            return (
                <div className="error">
                    <div>{this.props.fallback}</div>
                    <div>{this.state.error.message}</div>
                </div>
            );
        }
        return this.props.children;
    }

}

export default ErrorBoundary;