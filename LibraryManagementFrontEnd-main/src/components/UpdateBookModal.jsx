import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ToastContainer, toast } from 'react-toastify'

const UpdateBookModal = ({ book, setBooks, categories, setIsUpdateOpen }) => {

    useEffect(() => {
        if (book) {
            console.log(book)
        }
    }, [book])

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

    const notifyToastBookUpdated = () => {
        toast.success('Book details updated', {
            position: 'top-right',
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
        })
    }

    const updateBook = async (book) => {
        try {
            const res = await axios.put('/api/books', book)
            const data = res.data
            setBooks(data._id, "update", data)
        } catch (err) {
            console.log(err)
        }
    }

    const onSubmit = async (data) => {
        try {
            data.bookId = book._id
        if (data.category === 'Other') {
            data.category = data.newCategory
        }
        if (data.newCategory) delete data.newCategory
        await updateBook(data)
        notifyToastBookUpdated()
        reset()
        setTimeout(() => {
            setIsUpdateOpen(false)
        }, 2000)
        } catch (err) {
            console.log(err)
        }
    } 

  return (
    <div className='update-book'>
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
            <h1>UPDATE BOOK</h1>
            <fieldset>
                <input
                    type='text'
                    defaultValue={book?.title}
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
                    defaultValue={book?.author}
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
                defaultValue={book?.category}
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
                    type='number'
                    defaultValue={book?.quantity}
                    placeholder='quantity'
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
                defaultValue={book?.description}
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
            <div className="form-btns">
            <button className='btn-submit' type='submit'>
                UPDATE
            </button>
            <button className='btn-submit' type='button' onClick={() => setIsUpdateOpen(false)}>
                CANCEL
            </button>
            </div>
        </form>
    </div>
  )
}

export default UpdateBookModal