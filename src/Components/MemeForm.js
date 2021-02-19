import React, {Component} from "react";
import axios from 'axios'

class MemeForm extends Component {
    constructor(){
        super()
        this.state = {
            id: 0,
            url: '',
            title: '',
            editing: false
        }
    }

    componentDidMount(){
        if(this.props.match.params.id){
            axios.get(`/api/memes/${this.props.match.params.id}`)
            .then(res => this.setState({
                id: res.data.id,
                url: res.data.url,
                title: res.data.title,
                editing: true
            }))
        }
    }

    handleChange = e => {
        const {name, value} = e.target
        this.setState({
            [name]: value
        })
    }

    addMeme = (url, title) => {
        if(!url){
            url = 'https://is3-ssl.mzstatic.com/image/thumb/Purple69/v4/42/b6/65/42b665fa-8ce6-2550-58af-ffeb981ebecb/source/512x512bb.jpg'
        }
        if(!title){
            title = 'Lame Caption'
        }
        axios.post('/api/memes', {url, title})
        .then(()=> {
            this.props.history.push('/wall-of-memes')
        })
    }

    updateMeme = (id, url, title) => {
        if(!url){
            url = 'https://is3-ssl.mzstatic.com/image/thumb/Purple69/v4/42/b6/65/42b665fa-8ce6-2550-58af-ffeb981ebecb/source/512x512bb.jpg'
        }
        if(!title){
            title = 'Lame Caption'
        }
        axios.put(`/api/memes/${id}`)
        .then(()=> {
            this.props.history.push('/wall-of-memes')
        })
    }

    render(){
        const { id, url, title, editing } = this.state
        return (
            <div className='form-container'>
                <div className="form-box">
                    <input
                        name='tile'
                        onChange={this.handleChange}
                        placeholder='Meme Title'
                        value={this.state.title}
                        maxLength='20'
                        className='meme-title-input'
                    />
                    <img
                        src={`${url}` || 'https://is3-ssl.mzstatic.com/image/thumb/Purple69/v4/42/b6/65/42b665fa-8ce6-2550-58af-ffeb981ebecb/source/512x512bb.jpg'}
                        alt='meme preview'
                    />
                    <input
                        name='url'
                        onChange={e => this.handleChange(e)}
                        placeholder='Meme URL'
                        value={this.state.curl}
                        className='url-input'
                    />
                    {editing ? (
                        <button onClick={() => this.updateMeme(id, url, title)} className='add-edit-button'>Update Meme!</button>
                    ) : (
                        <button onClick={() => this.addMeme(url, title)} className='add-edit-button'>Add Meme!</button>
                    )}
                </div>
            </div>
        );
    }
    
}

export default MemeForm;
