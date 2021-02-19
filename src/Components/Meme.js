import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { connect } from 'react-redux'
import { favorited, unfavorite } from '../ducks/reducer'

class Meme extends Component {
    constructor(){
        super()
        this.state = {
            favorited: false
        }
    }

    componentDidMount(){
        if(this.props.favorites){
            let index = this.props.favorites.findIndex(meme => meme.id === this.props.memeInfo.id)
            if(index !== -1) {
                this.setState({
                    favorited: true
                })
            }
        }
    }

    delete = id => {
        axios.delete(`/api/memes/${id}`)
        .then(() => {
            if(this.props.favorite){
                this.props.unfavorite();
            } else {
                this.props.reRender()
            }
        })
    }

    edit = id => {
        this.props.history.push(`/form/${id}`)
    }

    toggleFav = (memeInfo) => {
        if(this.state.favorited){
            this.props.unfavorite(memeInfo.id)
        } else {
            this.props.favorited(memeInfo)
        }
        this.setState({
            favorited: !this.state.favorited
        })
    }

    render(){
        return(
            <div className='meme-box'>
                <div className='meme-title'>{this.props.memeInfo.title}</div>
                <img src={`${this.props.memeInfo.url}`} alt='pic of meme'/>
                <div className='button-container'>
                    <button onClick={() => this.delete(this.props.memeInfo.id)} className='meme-buttons'>Delete</button>
                    <div onClick={() => this.toggleFav()}>
                        {this.state.favorited ? (
                            <div className='heart'/>
                        ):(
                            <img src={'/heart-icon.png'} alt='heart icon' className='heart-image'/>
                        )}
                    </div>
                    <button onClick={() => this.edit(this.props.memeInfo.id)} className='meme-buttons'>Edit Meme</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        favorites: state.reducer.favorited
    }
}

export default connect(mapStateToProps, {unfavorite, favorited})(withRouter(Meme))