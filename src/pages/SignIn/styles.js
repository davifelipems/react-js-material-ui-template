import styled from "styled-components"
import {primaryColor,secondaryColor} from '../../common/template/meterialUiCustomComponents'

export const FromBody = styled.div`
      overflow: hidden;
      .wave{
        position: fixed;
        bottom: 0;
        left: 0;
        height: 100%;
        z-index: -1;
      }
      .container{
        width: 100vw;
        height: 100vh;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap :7rem;
        padding: 0 2rem;
      }
      .img {
        display: flex;
        justify-content: flex-end;
        align-items: center;
      }
      .login-content{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        text-align: center;
      }
      
      .img img{
        width: 500px;
      }
      
      form{
        width: 360px;
      }
      
      .login-content img{
          height: 100px;
      }
      
      .login-content h2{
        margin: 15px 0;
        color: #333;
        text-transform: uppercase;
        font-size: 2.9rem;
      }
      
      a{
        display: block;
        text-align: right;
        text-decoration: none;
        color: #999;
        font-size: 0.9rem;
        transition: .3s;
      }

      a:hover{
        color: ${primaryColor};
      }
      
      .btn{
        display: block;
        width: 100%;
        height: 50px;
        border-radius: 25px;
        outline: none;
        border: none;
        background-image: linear-gradient(to right, ${secondaryColor}, ${primaryColor}, ${secondaryColor});
        background-size: 200%;
        font-size: 1.2rem;
        color: #fff;
        font-family: 'Roboto', sans-serif;
        text-transform: uppercase;
        margin: 1rem 0;
        cursor: pointer;
        transition: .5s;
      }
      .btn:hover{
        background-position: right;
      }
      
      
      @media screen and (max-width: 1050px){
        .container{
          grid-gap: 5rem;
        }
      }
      
      @media screen and (max-width: 1000px){
        form{
          width: 290px;
        }
      
        .login-content h2{
              font-size: 2.4rem;
              margin: 8px 0;
        }
      
        .img img{
          width: 400px;
        }
      }
      
      @media screen and (max-width: 900px){
        .container{
          grid-template-columns: 1fr;
        }
      
        .img{
          display: none;
        }
      
        .wave{
          display: none;
        }
      
        .login-content{
          justify-content: center;
        }
      }
`