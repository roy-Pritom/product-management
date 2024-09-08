import { useForm, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import { useLoginMutation } from '../../redux/api/auth/authApi';
import { toast } from 'sonner';
import { useAppDispatch } from '../../redux/hooks';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../redux/features/auth/authSlice';
import { decodeToken } from '../../utils/jwtDecoder';

// type
type FormValues = {
    email: string;
    password: string;
};

const LoginPage = () => {
    // login mutation [redux rtk query]
    const [login] = useLoginMutation();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();

    // For login
    const onSubmit = async (data: FormValues) => {
        // console.log(data);
        const toastId = toast.loading('processing...')
        try {

            // login user
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const res: any = await login(data);
            //  console.log(res);
            if (res?.data?.user) {
                // decode token
                const user=decodeToken(res?.data?.user?.token)
                // set token in redux state
                dispatch(setUser({user,token:res?.data?.user?.token}))
                toast.success('User login successfully!!!', { id: toastId, duration: 1000 })
                // navigate home page
                navigate('/')
            }
            else {
                toast.error(res?.error?.data?.message, { id: toastId, duration: 1000 })

            }
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch (error: any) {
            console.log(error?.message);
            toast.error(error?.message, { id: toastId, duration: 1000 })

        }
    }

    // for validation error
    const getErrorMessage = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
    ): string | undefined => {
        if (typeof error === 'string') {
            return error;
        } else if (error && typeof error.message === 'string') {
            return error.message;
        }
        return undefined;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8 max-w-7xl md:mx-auto mx-3">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Sign in to your account
                </h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Email address
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Enter a valid email address"
                                        }
                                    })}
                                    type="email"
                                    placeholder="Enter your email address"
                                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.email ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.email && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {getErrorMessage(errors.email)}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Password
                            </label>
                            <div className="mt-1">
                                <input
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: {
                                            value: 3,
                                            message: "Password must be at least 3 characters long"
                                        }
                                    })}
                                    type="password"
                                    placeholder="Enter your password"
                                    className={`appearance-none block w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${errors.password ? 'border-red-500' : 'border-gray-300'
                                        }`}
                                />
                                {errors.password && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {getErrorMessage(errors.password)}
                                    </p>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember_me"
                                    name="remember_me"
                                    type="checkbox"
                                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                />
                                <label className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                                    Forgot your password?
                                </a>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Sign in
                            </button>
                        </div>
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-gray-100 text-gray-500">
                                    Or continue with
                                </span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-3 gap-3">
                            <div>
                                <a href="#"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    {/* Social Login Icons */}
                                </a>
                            </div>
                            <div>
                                <a href="#"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    {/* Social Login Icons */}
                                </a>
                            </div>
                            <div>
                                <a href="#"
                                    className="w-full flex items-center justify-center px-8 py-3 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    {/* Social Login Icons */}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;