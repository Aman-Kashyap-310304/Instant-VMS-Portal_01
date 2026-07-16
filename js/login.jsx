const { useState } = React;

const LoginApp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const [errors, setErrors] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [statusMsg, setStatusMsg] = useState(null); // { type: 'error' | 'success', text: '' }

    const validate = () => {
        let valid = true;
        const newErrors = { email: '', password: '' };

        if (!email) {
            newErrors.email = 'Email is required';
            valid = false;
        } else {
            const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
            if (!emailRegex.test(email)) {
                newErrors.email = 'Valid email is required';
                valid = false;
            }
        }

        if (!password) {
            newErrors.password = 'Password is required';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatusMsg(null);

        if (validate()) {
            setLoading(true);

            // Simulate auth check delay
            setTimeout(() => {
                setLoading(false);
                // Mock simple validation: let's say test@vms.com is the only "valid" user, or just always succeed.
                // We'll simulate success for anything that passes regex for demonstration.
                setStatusMsg({ type: 'success', text: 'Login successful! Redirecting...' });

                // Redirect back to landing after 1.5s
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500);
            }, 1000);
        }
    };

    return (
        <div className="login-container">
            <div className="logo-badge">VMS</div>

            <div className="header">
                <h2>Sign In</h2>
                <p>Access your VMS portal account</p>
            </div>

            {statusMsg && (
                <div className={`alert-${statusMsg.type}`}>
                    {statusMsg.text}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Email / Username</label>
                    <input
                        type="text"
                        className={`form-control ${errors.email ? 'error' : ''}`}
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors({ ...errors, email: '' });
                        }}
                    />
                    {errors.email && <div className="error-msg">{errors.email}</div>}
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input
                        type={showPassword ? "text" : "password"}
                        className={`form-control ${errors.password ? 'error' : ''}`}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            if (errors.password) setErrors({ ...errors, password: '' });
                        }}
                    />
                    <button
                        type="button"
                        className="password-toggle"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                    {errors.password && <div className="error-msg">{errors.password}</div>}
                </div>

                <div className="checkbox-group">
                    <input
                        type="checkbox"
                        id="rememberMe"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <label htmlFor="rememberMe">Remember me</label>
                </div>

                <button type="submit" className="btn-primary" disabled={loading}>
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>

            <div className="footer">
                Don't have an account? <a href="register.html">Register</a>
            </div>
        </div>
    );
};

const rootNode = document.getElementById('login-root');
const root = ReactDOM.createRoot(rootNode);
root.render(<LoginApp />);