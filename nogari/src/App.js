import React from 'react';
import { Route } from 'react-router-dom';
import {
    LiarGameView,
    RouletteGameView,
    WordGameView,
    MainView,
    AlcoholMarbleView,
    ChangeCharacterView,
    Choose_Char,
    Find,
    NewWaitingRoom, LiarCategoryView,WordGameCategoryView,
    StoryMain
} from './views';
import CompletionVoteComponent from "./components/voteBadge/CompletionVoteComponent";
import Result from "./components/common/result";

function App() {
    return (
        <div>
            <div>
                <Route exact path="/" component={MainView}/>
                <Route path="/rooms/:roomId/liar" component={LiarGameView}/>
                <Route path="/rooms/:roomId/rottenPlates" component={RouletteGameView}/>
                <Route path="/rooms/:roomId/word" component={WordGameView}/>
                <Route path="/Find" component={Find}/>
                <Route path="/Choose_Char" component={Choose_Char}/>
                <Route exact path="/rooms/:roomId" component={NewWaitingRoom}/>
                <Route exact path="/rooms/:roomId/liarCategory" component={LiarCategoryView}/>
                <Route exact path="/rooms/:roomId/wordCategory" component={WordGameCategoryView}/>
                <Route path="/rooms/:roomId/marble" component={AlcoholMarbleView}/>
                <Route path="/changeCharacter" component={ChangeCharacterView}/>
                <Route path="/badge" component={CompletionVoteComponent}/>
                <Route path = "/story" component ={StoryMain}/>
                <Route path = "/result" component ={Result}/>
            </div>
        </div>
    );
}

export default App;
