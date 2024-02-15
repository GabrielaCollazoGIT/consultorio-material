
import React, {useEffect, useState} from 'react';
import { Container, Grid } from '@mui/material';


const Home = () => {
    const[loopNum, setLoopNum] = useState(0);
    const[isDeleting,setIsDeleting] = useState(false);
    const toRotate = [ 'Profesionales trabajando para vos... '];
    const[text, setText] = useState('');
    const[delta, setDelta] = useState(300- Math.random() * 100);
    const period = 2000;

useEffect(() =>{
    let ticker = setInterval(()=>{
        tick();
    },delta)
    return () => {clearInterval(ticker)};
})

const tick = () =>{
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updatedText = isDeleting ? fullText.substring(0, text.length -1) : fullText.substring(0, text.length +1);

    setText(updatedText);
    if(isDeleting){
        setDelta(prevDelta => prevDelta /2)
    }
    if(!isDeleting && updatedText === fullText){
        setIsDeleting(true);
        setDelta(period);
    }else if(isDeleting && updatedText === ''){
        setIsDeleting(false);
        setLoopNum(loopNum +1);
        setDelta(500);
    }
}


        
    return(
    <section className='banner' id='home'>
        <Container>
            <Grid className='align-items-center'>
                <Grid item xs={12} md={6} xl={7}>
                    <span className='tagline special-line'>Bienvenido a tu nuevo cuidado Personal</span>
                    <h1 style={{ textAlign: 'left' }}>{`Centro medico especializado en el cuidado de tu Salud.  `}
                    <span className='wrap'>{text}</span>
                    </h1>
                </Grid>
            
            </Grid>
        </Container>
    </section>
    );

};
export default Home;