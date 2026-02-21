import { useState, FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { AuthContainer, Input, Button } from '../components';
import { RegisterFormData, RegisterFormErrors } from '../types';

export const RegisterPage = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleChange = (field: keyof RegisterFormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: false }));
  };

  const formatPhone = (value: string): string => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2');
    }
    return formData.phone;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhone(e.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    setErrors((prev) => ({ ...prev, phone: false }));
  };

  const validateForm = (): boolean => {
    const newErrors: RegisterFormErrors = {};

    if (!formData.name.trim() || formData.name.length < 3) {
      newErrors.name = true;
    }

    if (!formData.email.trim()) {
      newErrors.email = true;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = true;
    }

    const phoneNumbers = formData.phone.replace(/\D/g, '');
    if (!phoneNumbers || phoneNumbers.length < 10) {
      newErrors.phone = true;
    }

    if (!formData.password.trim() || formData.password.length < 8) {
      newErrors.password = true;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!acceptTerms) {
      alert('Você precisa aceitar os termos de uso e política de privacidade.');
      return;
    }

    if (!validateForm()) return;

    setIsLoading(true);

    // TODO: Implementar lógica de registro
    setTimeout(() => {
      console.log('Register data:', formData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <AuthContainer
      title="Criar conta"
      subtitle="Preencha os dados abaixo para começar"
      showBackButton={false}
      withSideImage={true}
        sideImage="/imagens/elementos/background-register.jpg"
    >
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <Input
          label="Nome completo"
          type="text"
          name="name"
          placeholder="João Silva"
          value={formData.name}
          onChange={handleChange('name')}
          error={errors.name}
          autoComplete="name"
        />

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
          label="Telefone/WhatsApp"
          type="tel"
          name="phone"
          placeholder="(00) 00000-0000"
          value={formData.phone}
          onChange={handlePhoneChange}
          error={errors.phone}
          autoComplete="tel"
        />

        <Input
          label="Senha"
          type="password"
          name="password"
          placeholder="Mínimo 8 caracteres"
          value={formData.password}
          onChange={handleChange('password')}
          error={errors.password}
          autoComplete="new-password"
        />

        {formData.password && formData.password.length > 0 && (
          <div className="text-[0.75rem] space-y-1 px-3 py-2 bg-[#131313] rounded-lg border border-border">
            <p className="text-text-dim font-medium mb-1">
              Sua senha deve conter:
            </p>
            <div className="space-y-1">
              <div
                className={`flex items-center gap-2 ${
                  formData.password.length >= 8 ? 'text-wa' : 'text-muted'
                }`}
              >
                <span>
                  {formData.password.length >= 8 ? '✓' : '○'}
                </span>
                <span>Mínimo de 8 caracteres</span>
              </div>
              <div
                className={`flex items-center gap-2 ${
                  /[A-Z]/.test(formData.password) ? 'text-wa' : 'text-muted'
                }`}
              >
                <span>
                  {/[A-Z]/.test(formData.password) ? '✓' : '○'}
                </span>
                <span>Uma letra maiúscula</span>
              </div>
              <div
                className={`flex items-center gap-2 ${
                  /[0-9]/.test(formData.password) ? 'text-wa' : 'text-muted'
                }`}
              >
                <span>
                  {/[0-9]/.test(formData.password) ? '✓' : '○'}
                </span>
                <span>Um número</span>
              </div>
            </div>
          </div>
        )}

        <Input
          label="Confirmar senha"
          type="password"
          name="confirmPassword"
          placeholder="Digite a senha novamente"
          value={formData.confirmPassword}
          onChange={handleChange('confirmPassword')}
          error={errors.confirmPassword}
          autoComplete="new-password"
        />

        <label className="flex items-start gap-2 cursor-pointer group pt-1">
          <input
            type="checkbox"
            checked={acceptTerms}
            onChange={(e) => setAcceptTerms(e.target.checked)}
            className="w-4 h-4 mt-0.5 rounded border-border bg-[#131313] text-gold focus:ring-gold/50 focus:ring-2 cursor-pointer flex-shrink-0"
          />
          <span className="text-text-dim text-[0.8rem] group-hover:text-text transition-colors">
            Eu aceito os{' '}
            <Link
              to="/termos"
              className="text-gold hover:text-gold/80 font-medium"
            >
              termos de uso
            </Link>{' '}
            e a{' '}
            <Link
              to="/privacidade"
              className="text-gold hover:text-gold/80 font-medium"
            >
              política de privacidade
            </Link>
          </span>
        </label>

        <Button
          type="submit"
          variant="primary"
          fullWidth
          disabled={isLoading || !acceptTerms}
        >
          {isLoading ? 'Criando conta...' : 'Criar conta'}
        </Button>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-bg text-muted">ou</span>
          </div>
        </div>

        <div className="text-center text-[0.85rem] mb-8">
          <span className="text-text-dim">Já tem uma conta? </span>
          <Link
            to="/login"
            className="text-gold hover:text-gold/80 transition-colors font-semibold"
          >
            Fazer login
          </Link>
        </div>
      </form>
    </AuthContainer>
  );
};
