import { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../Context/AuthContext';
import './Register.css';

// Rainforest Canvas Animation (same as Login)
const RainforestBG = () => {
  const canvasRef = useRef();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    const drops = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      length: Math.random() * 20 + 10,
      speed: Math.random() * 4 + 2,
      opacity: Math.random() * 0.4 + 0.1,
      width: Math.random() * 1.5 + 0.5,
    }));

    const leaves = Array.from({ length: 18 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 30 + 20,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.02,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: Math.random() * 0.8 + 0.3,
      opacity: Math.random() * 0.6 + 0.2,
      color: `hsl(${120 + Math.random() * 40}, ${60 + Math.random() * 30}%, ${30 + Math.random() * 25}%)`,
    }));

    const fireflies = Array.from({ length: 15 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 1.5,
      speedY: (Math.random() - 0.5) * 1.5,
      opacity: Math.random(),
      opacityDir: Math.random() > 0.5 ? 1 : -1,
      opacitySpeed: Math.random() * 0.03 + 0.01,
    }));

    const drawLeaf = (ctx, x, y, size, rotation, color, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.globalAlpha = opacity;
      ctx.fillStyle = color;
      ctx.strokeStyle = 'rgba(0,80,0,0.3)';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.bezierCurveTo(size / 2, -size / 4, size / 2, size / 4, 0, size / 2);
      ctx.bezierCurveTo(-size / 2, size / 4, -size / 2, -size / 4, 0, -size / 2);
      ctx.fill();
      ctx.stroke();
      ctx.globalAlpha = opacity * 0.4;
      ctx.strokeStyle = 'rgba(0,100,0,0.5)';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -size / 2);
      ctx.lineTo(0, size / 2);
      ctx.stroke();
      ctx.restore();
    };

    let animId;
    const animate = () => {
      ctx.fillStyle = 'rgba(235, 245, 235, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drops.forEach((drop) => {
        ctx.save();
        ctx.globalAlpha = drop.opacity;
        ctx.strokeStyle = '#4a9e6a';
        ctx.lineWidth = drop.width;
        ctx.beginPath();
        ctx.moveTo(drop.x, drop.y);
        ctx.lineTo(drop.x - 1, drop.y + drop.length);
        ctx.stroke();
        ctx.restore();
        drop.y += drop.speed;
        if (drop.y > canvas.height) {
          drop.y = -drop.length;
          drop.x = Math.random() * canvas.width;
        }
      });

      leaves.forEach((leaf) => {
        drawLeaf(ctx, leaf.x, leaf.y, leaf.size, leaf.rotation, leaf.color, leaf.opacity);
        leaf.x += leaf.speedX;
        leaf.y += leaf.speedY;
        leaf.rotation += leaf.rotSpeed;
        if (leaf.y > canvas.height + 50) { leaf.y = -50; leaf.x = Math.random() * canvas.width; }
        if (leaf.x < -50) leaf.x = canvas.width + 50;
        if (leaf.x > canvas.width + 50) leaf.x = -50;
      });

      fireflies.forEach((ff) => {
        ctx.save();
        ctx.globalAlpha = ff.opacity;
        const grad = ctx.createRadialGradient(ff.x, ff.y, 0, ff.x, ff.y, ff.radius * 4);
        grad.addColorStop(0, 'rgba(180, 255, 150, 1)');
        grad.addColorStop(1, 'rgba(180, 255, 150, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ff.x, ff.y, ff.radius * 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
        ff.x += ff.speedX;
        ff.y += ff.speedY;
        ff.opacity += ff.opacityDir * ff.opacitySpeed;
        if (ff.opacity >= 1 || ff.opacity <= 0) ff.opacityDir *= -1;
        if (ff.x < 0 || ff.x > canvas.width) ff.speedX *= -1;
        if (ff.y < 0 || ff.y > canvas.height) ff.speedY *= -1;
      });

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/register', form);
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="register-page">
      <RainforestBG />
      <div className="register-box">
        <div className="register-brand">
          <span className="register-leaf">🌿</span>
          <h1>FreshCart</h1>
        </div>
        <h2>Create Account</h2>
        <p className="register-sub">Join us and shop fresh today!</p>
        {error && <p className="register-error">{error}</p>}
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register-field">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </div>
          <div className="register-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div className="register-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button type="submit" className="register-btn">Create Account →</button>
        </form>
        <p className="register-footer">
          Already have an account? <Link to="/login">Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;