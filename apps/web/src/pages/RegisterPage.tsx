import RegisterForm from '@/components/register';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  return (
    <div className="bg-gradient-to-r from-[#6da6be] via-[#4b859e] to-[#6da6be] w-full min-h-screen flex items-center justify-center gap-16 px-16 flex-col lg:flex-row lg:gap-24">

      {/* panneau gauche */}
      <div className='max-w-md'>
        <div className='flex items-center gap-2 text-3xl font-bold text-white mb-12'> ✨ FinFlow</div>
        <div className='text-4xl font-bold text-white'> Hey, Hello</div>
        <div className='text-xl text-white mt-4'> Votre solution de gestion financière simplifiée</div>
        <div className='text-lg text-white/60 mt-4'> Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia architecto  eligendi deleniti!</div>
      </div>

      {/* panneau droit */}
      <div className='bg-white w-full max-w-md rounded-2xl shadow-xl p-10 text-center'>
          <h1 className='text-2xl font-bold mb-1 text-black'>Register</h1>
          <h2 className='text-sm  mb-4 text-black'>Bienvenue sur FinFLow</h2>
           <RegisterForm />
            <p className="text-sm mt-6">
              Déja un compte ? <Link to="/login" className="text-[#4b859e] font-medium">Connectez-vous</Link>
            </p>
      </div>
    </div>
  );
};

export default RegisterPage;