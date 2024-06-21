import React, { useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import getDownloadImageURL from '../utils/getDownloadImageURL'

const AddBookForm = ({ categories, setBooks }) => {
    const [isNewCategory, setIsNewCategory] = useState(false)

    const {
        register,
        handleSubmit,
        watch,
        resetField,
        reset,
        formState: { errors },
    } = useForm()

    const watchCategory = watch("category")

    useEffect(() => {
        if (watchCategory) {
            resetField("newCategory")
            if (watchCategory === 'Other') setIsNewCategory(true)
            else setIsNewCategory(false)
        } 
    }, [watchCategory])

    const addBook = async (book) => {
        try {
            const res = await axios.post("/api/books", book)
            setBooks(book);
        } catch (err) {
            console.log(err)
        }
    }

    const notifyToastBookAdded = () => {
        toast.success('Book Added', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            className:"toast-notification"
        })
    }
    
    const getUploadedImageURL = async (file) => {
        try {
            const downloadURL = await getDownloadImageURL(file, "books/", file.name + "-" + JSON.stringify(Date.now()));
            return downloadURL
        } catch (err) {
            console.log(err)
        }

    }

    const onSubmit = async (data) => {
        try {
            if (data.category === 'Other') {
                data.category = data.newCategory
            }
            if (data.newCategory) delete data.newCategory
            data.image = await getUploadedImageURL(data.image[0])
            addBook(data)
            notifyToastBookAdded()
            reset()
        } catch (err) {
            console.log(err)
        }
        
    }

    return (
        <form action='' onSubmit={handleSubmit(onSubmit)} className='add-book'>
            <ToastContainer
                    position='top-right'
                    autoClose={3000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover={false}
                />
            <h1>ADD A BOOK</h1>
            <fieldset>
                <input
                    type='text'
                    placeholder='Title'
                    {...register('title', {
                        required: true,
                    })}
                />
                {errors.title && errors.title.type === 'required' && (
                    <p className='form-error'>Title is required</p>
                )}
            </fieldset>
            <fieldset>
                <input
                    type='text'
                    placeholder='Author'
                    {...register('author', {
                        required: true,
                    })}
                />
                {errors.author && errors.author.type === 'required' && (
                    <p className='form-error'>Author is required</p>
                )}
            </fieldset>
            <fieldset>
                <div className="category-field">
                <label htmlFor="category">Category :</label>
                <select
                id="category"
                    placeholder='category'
                    {...register('category', {
                        required: true,
                    })}
                >
                    {categories?.map((item, index) => (
                        <option key={index} value={item}>
                            {item}
                        </option>
                    ))}
                    <option value='Other'>Other</option>
                </select>
                </div>
                {isNewCategory && (
                    <fieldset className='other-category'>
                        <input
                            type='text'
                            placeholder='Category'
                            {...register('newCategory', {
                                required: true,
                            })}
                        />
                    </fieldset>
                )}
                {isNewCategory && errors.newCategory?.type === 'required' && (
                    <p className='form-error'>Category is required</p>
                )}
            </fieldset>
            <fieldset>
                <input
                    type='file'
                    name="image"
                    accept=".jpg, .jpeg, .png"
                    placeholder='Image'
                    {...register('image', {required: true})}
                />
                {errors.image && errors.image.type === 'required' && (
                    <p className='form-error'>Image is required</p>
                )}
            </fieldset>
            <fieldset>
                <input
                    id="quantity"
                    type='number'
                    placeholder='Quantity'
                    {...register('quantity', {
                        required: true,
                    })}
                />
                {errors.quantity && errors.quantity.type === 'required' && (
                    <p className='form-error'>Quantity is required</p>
                )}
            </fieldset>
            <fieldset>
                <textarea
                    placeholder='Description'
                    {...register('description', {
                        required: true,
                    })}
                ></textarea>
                {errors.description &&
                    errors.description.type === 'required' && (
                        <p className='form-error'>Description is required</p>
                    )}
            </fieldset>
            <button className='btn-submit' type='submit'>
                SUBMIT
            </button>
        </form>
    )
}

export default AddBookForm
