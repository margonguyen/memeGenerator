import React from 'react'

class Generator extends React.Component{
    constructor(){
        super()
        this.state ={
            top :"",
            bottom:"",
            img:[],
            randomImg : "http://i.imgflip.com/1bij.jpg"
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

    }
    componentDidMount(){
        fetch('https://api.imgflip.com/get_memes')
            .then(response =>response.json())
            .then(response =>{
                const {memes} = response.data
                this.setState({ img : memes})
            })
    }
    handleChange(event){
        const {name,value} = event.target
        this.setState(
        {
         [name] : value   
        })
    }
    handleSubmit(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * this.state.img.length)
        const randMemeImg = this.state.img[randNum].url

        this.setState({ randomImg: randMemeImg })
    }
    render(){
        return (
            <div >
                <form className="meme-form" onSubmit={this.handleSubmit} >
                    <input type="text" placeholder="top section" name="top" value={this.state.top} onChange={this.handleChange}/>
                     <input type="text" placeholder="bottom section" name ="bottom" value={this.state.bottom} onChange={this.handleChange}/>
                     <button  >generate </button>
                </form>

                <div className="meme">
                    <img src={this.state.randomImg} alt="" />       
                    <h2 className="top"> {this.state.top}</h2>
                    <h2 className ="bottom"> {this.state.bottom}</h2>
                </div>

            </div>
            )
    }
}

export default Generator


