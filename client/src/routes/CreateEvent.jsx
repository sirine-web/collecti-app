import { PlusSmallIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { useFormik } from 'formik'
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ImageUpload from '../components/ImageUpload'
import Button from '../components/shared/Button'
import { useCreateEventMutation } from '../endpoints/AuthEndpoints'
import { useStorage } from '../hooks/useStorage'
import { CreateEventSchema } from '../schemas'
import { setVisible } from '../features/conffetiSlice'
import { openModal, setContent } from '../features/modalSlice'
import EventCreatedPopUp from '../components/event/EventCreatedPopUp'
import { useEffect } from 'react'

const CreateEvent = () => {
    const [tags, setTags] = useState([])
    const [images, setImages] = useState([])
    const { uploadFile, isLoading } = useStorage()
    const tagInputRef = useRef(null)
    const [categorySelec,setCategorySelec]=useState("")

    const user = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const [createEvent, { isLoading: requestLoading }] = useCreateEventMutation()

    const checkImages = (images) => {
        setImages(images)
        if (images.length > 0) {
            setFieldValue("images", images)
        } else {
            setFieldValue("images", [])
        }
    }

    useEffect(()=>{
        setFieldValue("category",categorySelec)
        console.log(categorySelec)
    },[categorySelec])

    const uploadImages = async (images) => {
        const promises = images.map(image => {
            return uploadFile(image)
        })
        const urls = await Promise.all(promises)
        return urls
    }

    const { values, handleChange, handleBlur, errors, touched, setFieldValue, handleSubmit } = useFormik({
        initialValues: {
            title: "",
            slogan: "",
            category: "",
            keywords: [],
            images: [],
            price: "",
            date: "",
            description: "",
        },
        validationSchema: CreateEventSchema,
        onSubmit: async (values) => {
          
            const urls = await uploadImages(images)
            const event = {
                name: values.title,
                description: values.description,
                category: values.category,
                keywords: values.keywords,
                date: values.date,
                requirementFunds: values.price,
                organization_id: user.userId,
                catchPhrase: values.slogan,
                image: urls
            }
            try {
                const response = await createEvent({ ...event }).unwrap()
                console.log(response)
                dispatch(setContent(<EventCreatedPopUp url={`http://localhost:3000/events/${response.id}`} id={response.id} />))
                dispatch(openModal())
                dispatch(setVisible(true))
                setTimeout(() => {
                    dispatch(setVisible(false))
                }, 6000)
            } catch (error) {
                console.error(error)
            }

        }
    })

    const handleAddTag = () => {
        const tag = tagInputRef.current.value
        if (tag && !tags.includes(tag)) {
            setTags([...tags, tag])
            setFieldValue("keywords", [...tags, tag])
            tagInputRef.current.value = ""
        }
    }

    const handleRemoveTag = (tag) => {
        setTags(tags.filter(badge => badge !== tag))
        setFieldValue("keywords", tags.filter(badge => badge !== tag))
    }

    const handleSelectedCategory=()=>{
        setCategorySelec(document.querySelector('#selectedCategory').value);
        console.log("dddd",categorySelec)
       
    }
  


    return (
        <div className="w-full max-w-3xl p-4 mx-auto">
            <div className="mt-10">
                <h2 className="mb-4 text-2xl font-bold">Create a Fundraising Event 🎉</h2>
                <p className="mb-8 text-gray-700">Use this form to create a new fundraising event for your organization. 📝 Be sure to provide all of the necessary details, including the event name, catchphrase, categories, cover photo, and description. 🔍 This information will be used to promote your event and attract potential donors. 💰</p>
            </div>

            <form onSubmit={handleSubmit} className='flex flex-col space-y-3'>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Title</span>
                    </label>
                    <input type="text" name='title'
                        placeholder="Race for the Cure"
                        onChange={handleChange}
                        value={values.title}
                        onBlur={handleBlur}
                        className={`input input-bordered ${errors.title && touched.title && 'input-error'}`} />
                    {errors.title && touched.title && <p className="mt-2 text-xs text-red-500">{errors.title}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Slogan</span>
                    </label>
                    <input type="text" name='slogan' placeholder="Join us in the fight against breast cancer!"
                        onChange={handleChange}
                        value={values.slogan}
                        onBlur={handleBlur}
                        className={`input input-bordered ${errors.slogan && touched.slogan && 'input-error'}`} />
                    {errors.slogan && touched.slogan && <p className="mt-2 text-xs text-red-500">{errors.slogan}</p>}
                </div>
                <div className=" form-control">
                    <label className="label">
                        <span className="label-text">Category</span>
                      
                    </label>
                    <select id="selectedCategory" name="category" onChange={handleSelectedCategory}className="w-full select select-bordered">
                        {/* <option disabled selected value="pick">Pick one</option> */}
                        <option value="Computer science">Computer science</option>
                        <option value="Robotics">Robotics</option>
                        <option value="Cultural">Cultural</option>
                        
                    </select>
                   
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Keywords</span>
                    </label>
                    <div className="input-group">
                        <input type="text" placeholder="(e.g. charity, marathon, breast cancer)" className="w-full input input-bordered" ref={tagInputRef} />
                        <button className="flex w-24 btn btn-square" type="button" onClick={handleAddTag}>
                            <PlusSmallIcon className='w-6 h-6 mr-1 text-white' /> Add
                        </button>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                        {tags.map((tag, index) => (
                            <span key={index} className="cursor-pointer badge" onClick={() => handleRemoveTag(tag)} ><XMarkIcon className="w-4 h-4 mr-1" />{tag}</span>
                        ))}
                    </div>
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Price goal</span>
                    </label>
                    <label className="input-group">
                        <input type="number" placeholder="15000" name='price'
                            onChange={handleChange}
                            value={values.price}
                            onBlur={handleBlur}
                            className={`input input-bordered w-full ${errors.price && touched.price && 'input-error'}`} />
                        <span>TND</span>
                    </label>
                    {errors.price && touched.price && <p className="mt-2 text-xs text-red-500">{errors.price}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Event Images</span>
                    </label>
                    <ImageUpload images={images} setImages={checkImages} handleChange={handleChange} setFieldValue={setFieldValue} />
                    {errors.images && touched.images && <p className="mt-2 text-xs text-red-500">{errors.images}</p>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Event due date</span>
                    </label>
                    <input type="date" name='date'
                        onChange={handleChange}
                        value={values.date}
                        onBlur={handleBlur}
                        min={new Date().toISOString().split('T')[0]}
                        className={`input input-bordered ${errors.date && touched.date && 'input-error'}`} />
                    {errors.date && touched.date && <p className="mt-2 text-xs text-red-500">{errors.date}</p>}

                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Details</span>
                    </label>
                    <textarea placeholder="Join us for our annual Race for the Cure to raise funds for breast cancer research and support. This event is open to all fitness levels and is a great way to get active while supporting a good cause. All proceeds from ticket sales and donations will go towards supporting those affected by breast cancer and finding a cure. We hope to see you there!" name='description'
                        onChange={handleChange}
                        value={values.description}
                        onBlur={handleBlur}
                        className={`h-36 textarea textarea-bordered ${errors.description && touched.description && 'textarea-error'}`}
                    ></textarea>
                    {errors.description && touched.description && <p className="mt-2 text-xs text-red-500">{errors.description}</p>}
                </div>
                <p className="text-xs text-gray-600">
                    Please note: By submitting this form, you agree to make the event's data publicly available. This includes money collected and number of donors. This information will be visible to anyone visiting the event page. 🌍
                </p>
                <div className='text-right'>
                    <Button loading={isLoading || requestLoading} className="border-none btn animated-gradient" type="submit">Create Event</Button>
                </div>

            </form>
        </div>
    )
}

export default CreateEvent