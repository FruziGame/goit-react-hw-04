import toast, { Toaster } from 'react-hot-toast';
import css from "./SearchBar.module.css"





export default function SearchBar({onSubmit}) {

    const errorMessage = () => toast.error("The field should not be empty")

    const handleSubmit = (evt) => {
        evt.preventDefault();

        const form = evt.target;
        const input = form.elements.input.value;

        if (input.trim() === "") {
            errorMessage()
            return
        }
        onSubmit(input);
        evt.target.reset()
    }

    return(
        <header>
            <form onSubmit={handleSubmit} className={css.formContainer}>
                <input
                    className={css.input}
                    name="input"
                    type="text"
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
                <button className={css.btn} type="submit">Search</button>
                <div><Toaster/></div>
            </form>
        </header>
    )
}
