import { ChangeEvent, FormEvent, memo, useCallback, useState } from 'react';
import { AuthData } from '../../types/auth-data';
import { useAppDispatch } from '../../hooks';
import { loginAction } from '../../store/api-actions';

function LoginFormComponent(): JSX.Element {
  const dispatch = useAppDispatch();

  const [valid, setValid] = useState(false);
  const [formData, setFormData] = useState<AuthData>({
    email: '',
    password: '',
  });

  const isValidForm = (form: AuthData) => {
    const validEmail = new RegExp(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w+)$/);
    const validPass = new RegExp(/^(?=.*\d)(?=.*[a-z]).*$/);
    const isValidEmail = validEmail.test(form.email);
    const isValidPass = validPass.test(form.password);

    return isValidEmail && isValidPass;
  };

  const onInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
    if (isValidForm({ ...formData, [name]: value })) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [formData]);

  const onSubmit = useCallback((evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (valid) {
      dispatch(loginAction({
        email: formData.email,
        password: formData.password
      }));
    }
  }, [dispatch, formData.email, formData.password, valid]);

  return(
    <form
      className="login__form form"
      action="#"
      method="post"
      onSubmit={onSubmit}
    >
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">E-mail</label>
        <input
          onChange={onInputChange}
          value={formData.email}
          className="login__input form__input"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
      </div>
      <div className="login__input-wrapper form__input-wrapper">
        <label className="visually-hidden">Password</label>
        <input
          onChange={onInputChange}
          value={formData.password}
          className="login__input form__input"
          type="password"
          name="password" placeholder="Password"
          required
        />
      </div>
      <button
        className="login__submit form__submit button"
        type="submit"
        disabled={!valid}
      >
        Sign in
      </button>
    </form>
  );
}

const LoginForm = memo(LoginFormComponent);
export default LoginForm;
