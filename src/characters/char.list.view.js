import styled from 'styled-components';

export default {
htmlClear: styled.html`
height: 100vh;
`,
ContainerListView: styled.div`
display: flex;
height: 100%;
flex-direction: column;
`,
ContainerCard: styled.div`
display: flex;
height: 70%;
justify-content: space-around;
align-content: space-around;
flex-wrap: wrap;
`,
ButtonContainer: styled.div`
margin: 16px 16px 16px 50px;
`,
Button: styled.button`
font-size: 14px;
margin: 8px;
border: none;
background-color: #ffffff;
cursor: pointer;
outline:none;

&:active {
  border-radius: 2px;
  background-color: #F08080;
  color: white;
}
`
}