import React from 'react';

import Campaign from './../campaign';


 class App extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
        <div>
            <main >
                <Campaign/>
            </main>
        </div>
        )
    }
};

export default App;