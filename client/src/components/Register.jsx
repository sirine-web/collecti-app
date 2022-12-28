import { EyeIcon, EyeSlashIcon, XMarkIcon } from "@heroicons/react/24/outline"
import { useFormik } from "formik"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setContent } from "../features/modalSlice"
import { RegisterSchema } from "../schemas"
import Login from "./Login"
import Button from './shared/Button'

const Register = () => {
    const dispatch = useDispatch()

    const [showPassword, setShowPassword] = useState(false);

    const { values, handleChange, handleBlur, errors, touched, handleSubmit } = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: RegisterSchema,
        onSubmit: (values) => {
            console.log(values)
        }
    })

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <label className="relative max-w-sm p-0 modal-box lg:max-w-2xl bg-base-100">
            <div className="flex-shrink-0 mx-auto card">
                <label htmlFor="my-modal-4" className="absolute btn btn-circle btn-ghost right-2 top-2"><XMarkIcon className="w-6 h-6" /></label>
                <div className="flex flex-row items-center justify-around p-8">
                    <img className="hidden lg:block max-h-80" src="https://cdn.discordapp.com/attachments/311564936004370434/1054638096509042729/undraw_fingerprint_login_re_oqo9_1_2.svg" alt="login" />
                    <form onSubmit={handleSubmit} className="flex-grow max-w-sm p-0 px-2 card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" placeholder="name" name='name'
                                onChange={handleChange}
                                value={values.name}
                                onBlur={handleBlur}
                                className={`input input-bordered ${errors.name && touched.name && 'input-error'}`} />
                            {errors.name && touched.name && <p className="mt-2 text-xs text-red-500">{errors.name}</p>}
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" placeholder="email" name='email'
                                onChange={handleChange}
                                value={values.email}
                                onBlur={handleBlur}
                                className={`input input-bordered ${errors.email && touched.email && 'input-error'}`} />
                            {errors.email && touched.email && <p className="mt-2 text-xs text-red-500">{errors.email}</p>}

                        </div>
                        <label className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <div className="relative w-full">
                                <input type={showPassword ? "text" : "password"} placeholder="password" name='password'
                                    onChange={handleChange}
                                    value={values.password}
                                    onBlur={handleBlur}
                                    className={`input input-bordered w-full ${errors.password && touched.password && 'input-error'}`} />
                                <button onClick={toggleShowPassword} type='button' className="absolute right-0 btn btn-ghost">
                                    {showPassword ? <EyeSlashIcon className="w-6 h-6" /> : <EyeIcon className="w-6 h-6" />}
                                </button>
                                {errors.password && touched.password && <p className="mt-2 text-xs text-red-500">{errors.password}</p>}
                            </div>
                            <label className="label">
                                <span className="label-text-alt link link-hover">Forgot password?</span>
                            </label>
                        </label>
                        <div className="mt-6 form-control">
                            <Button primary type={'submit'}>Create an account</Button>
                        </div>
                        <div className="flex text-sm">
                            <p className="mr-1 text-base-content/70 grow-0">Already have an account?</p><span onClick={() => dispatch(setContent(<Login />))} className="link link-hover">Login</span>
                        </div>
                    </form>
                </div>
            </div>
        </label>
    )
}

export default Register