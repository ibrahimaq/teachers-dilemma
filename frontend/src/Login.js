import { useState, useEffect } from "react";


const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })
    const [error, setError] = useState(null)
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify(formData),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const data = await response.json();

        if(response.ok){
            setError(null);
            console.log('logged in successful ', data)
            setFormData({
                email: '',
                password: ''
            })
        }
        
        if(!response.ok){
            setError(data.error);
        }
        // else {
        //     setError(data.error);
        // }

    }

    useEffect(() => {
        console.log(formData);
    }, [formData])
    return ( 
        <>
        <h1>Login Page</h1>
        <form onSubmit={(e) => handleSubmit(e)}>
            <label htmlFor="email">Email</label>
            <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
            <label htmlFor="password">Password</label>
            <input type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} />
            <button type="submit">Submit</button>
        </form>
        {error && <div>{error}</div>}
        </>
     );
}
 
export default Login;