import { useState, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AuthContainer, Input, Button } from '../components';
import { LoginFormData, LoginFormErrors } from '../types';

export const LoginPage = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState<string>('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (field: keyof LoginFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
    setLoginError('');
  };

  const validateForm = (): boolean => {
    const newErrors: LoginFormErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = true;
    }

    if (!formData.password.trim() || formData.password.length < 6) {
      newErrors.password = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setLoginError('');

    try {
      const success = await login(formData.email, formData.password);
      
      if (success) {
        navigate('/gerenciar');
      } else {
        setLoginError('E-mail ou senha incorretos');
      }
    } catch (error) {
      setLoginError('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContainer
      title="Bem-vindo de volta"
      subtitle="Entre com suas credenciais para acessar sua conta"
      showBackButton={false}
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        {loginError && (
          <div className="px-4 py-3 bg-[#2d1515] border border-[#d84e4e]/30 rounded-lg text-[#ff6b6b] text-sm">
            {loginError}
          </div>
        )}

        <Input
          label="E-mail"
          type="email"
          name="email"
          placeholder="seu@email.com"
          value={formData.email}
          onChange={handleChange('email')}
          error={errors.email}
          autoComplete="email"
        />

        <Input
          label="Senha"
          type="password"
          name="password"
          placeholder="••••••••"
          value={formData.password}
          onChange={handleChange('password')}
          error={errors.password}
          autoComplete="current-password"
        />

        <div className="flex items-center justify-between text-[0.85rem]">
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              className="w-4 h-4 rounded border-border bg-[#131313] text-gold focus:ring-gold/50 focus:ring-2 cursor-pointer"
            />
            <span className="text-text-dim group-hover:text-text transition-colors">
              Lembrar de mim
            </span>
          </label>

          <a
            href="#"
            className="text-gold hover:text-gold/80 transition-colors font-medium"
          >
            Esqueceu a senha?
          </a>
        </div>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isLoading}
        >
          {isLoading ? 'Entrando...' : 'Entrar'}
        </Button>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-surface text-muted">ou</span>
          </div>
        </div>

        <div className="text-center text-[0.9rem] mt-4">
          <span className="text-text-dim">Ainda não tem uma conta? </span>
          <Link
            to="/register"
            className="text-gold hover:text-gold/80 transition-colors font-semibold"
          >
            Criar conta
          </Link>
        </div>
      </form>
    </AuthContainer>
  );
};
