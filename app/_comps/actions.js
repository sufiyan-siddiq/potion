export const signup = async (name, email, password) => {
    try {
        let response = await fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        })
        return response
    } catch (error) {
        console.log(error)
    }
}

export const add_new_doc = async (userId, parentId, title) => {
    try {
        let response = await fetch('http://localhost:3000/api/createDoc', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({ userId, parentId, title })
        }).then(r => r.json())
        response = response.newDoc.id
        return response
    } catch (error) {
        console.log(error)
    }
}

export const updateDoc = async (id, userId, coverImg, title, content) => {
    try {
        const response = await fetch('http://localhost:3000/api/update',
            {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ id, userId, coverImg, title, content })
            })
        let res = await response.json()
        return response.status
    } catch (error) {
        console.log(error)
    }
}

export const iconUpdate = async (id, userId, icon) => {
    try {
        const response = await fetch('http://localhost:3000/api/update',
            {
                method: 'PUT',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ id, userId, undefined, undefined, undefined, icon })
            })
        return response.status
    } catch (error) {
        console.log(error)
    }
}

export const deleteDoc = async (id, userId, parentId) => {
    try {
        const response = await fetch('http://localhost:3000/api/delete',
            {
                method: 'DELETE',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ id, userId, parentId })
            })
        return response.status
    } catch (error) {
        console.log(error)
    }
}