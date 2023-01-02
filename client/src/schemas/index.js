import * as yup from 'yup';

export const CreateEventSchema = yup.object().shape({
    title: yup.string().required('Title is required'),
    slogan: yup.string().required('Slogan is required'),
    price: yup.number().required('Price goal is required'),
    date: yup.date().required('Date is required'),
    description: yup.string().min(200, 'Description must be at least 200 characters').required('Description is required'),
})

export const RegisterSchema = yup.object().shape({
    name: yup.string().required("Whoops, a name is required. 😕"),
    email: yup.string().email("Sorry, but that email doesn't seem to be valid. 😞").required("Whoops, a email is required. 😕"),
    password: yup.string().min(6, "Your password must be at least 6 characters long. 😕").required("Whoops, a password is required. 😕"),
})

export const LoginSchema = yup.object().shape({
    email: yup.string().email("Sorry, but that email doesn't seem to be valid. 😞").required("Whoops, a email is required. 😕"),
    password: yup.string().min(6, "Your password must be at least 6 characters long. 😕").required("Whoops, a password is required. 😕"),
})

export const DonateSchema = yup.object().shape({
    amount: yup.number().required('Le montant est obligatoire'),
    name: yup.string().required('Le nom est obligatoire'),
    email: yup.string().email('Adresse email non valide').required('L\'email est obligatoire'),
    paymentMethod: yup.string().required('Le moyen de paiement est obligatoire'),
})

