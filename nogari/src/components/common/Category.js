import React, {useEffect, useState} from 'react';
import {getWordGameCategory, getPlayers} from "../../firebase/games/word-game";
import {setWord} from "../../firebase/games/liar";
import {updateGameState} from "../../firebase/games/word-game";
import '../css/Category.css';

export default function Category(props) {
    const [random, setRandom] = useState([]);
    const [wordGame, setWordGame] = useState([
        {
            quiz: '',
            answer: '',
        }
    ]);
    const [categoryData, setCategoryData] = useState({});
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [player, setPlayer] = useState();
    const [totalRound, setTotalRound] = useState(0);
    // 랜덤하게 추출
    const getRandom = (min, max) => {
        return Math.floor((Math.random() * (max - min + 1)) + min);
    }

    const getRandomArray = (min, max, count) => {
        if (max - min + 1 < count) return;

        let randomArr = [];
        while (1) {
            let index = getRandom(min, max);

            // 중복 여부를 체크
            if (randomArr.indexOf(index) > -1) {
                continue;
            }

            randomArr.push(index);

            // 원하는 배열 갯수가 되면 종료
            if(randomArr.length === 1 && count === 2) {
                break;
            }
            else if (randomArr.length === count + 1) {
                break;
            }
        }
        let arr = [];
        randomArr.map(num => {
            arr.push(wordGame[num])
        });
        console.log(arr);
        setRandom(arr);
    }


    useEffect(() => {
        const init = async () => {
            const gameData = await getWordGameCategory();
            const test = Object.entries(gameData);
            const category = test.map(([category]) => category);
            const playerData = await getPlayers(props.roomId);
            playerData !== undefined && console.log(playerData);
            playerData !== undefined && setPlayer(playerData['players']);
            console.log(playerData['players']);
            // Object.keys(playerData['players']).map((mem) => {
            //     playerData['players'][mem]['wordGame'].isCorrected
            // })
            console.log(player);
            setCategories(category);
            setCategoryData(gameData);
            console.log(test);
            console.log(category);
        };
        init();
    }, []);

    useEffect(()=> {
        player !== undefined && console.log(player);
        if (player !== undefined) {
            if (Object.keys(player).length === 1) {
                setTotalRound(1);
            }
            else {
                setTotalRound(Object.keys(player).length - 2);
            }
        }
        totalRound !== undefined && console.log(totalRound);
    },[player])


    const getCategoryData = (categoryName) => {
        props.setIsChoice(true);
        const random = Math.floor(Math.random() * 4); //단어 랜덤 선택 위한 index
        const gameData = categoryData[categoryName]; //해당 카테고리의 단어들 array
        const wordData = Object.values(gameData); //해당 카테고리 단어의 value (라이어게임 전용)
        setWord(props.roomId, wordData[random]); //랜덤 선택된 단어 (라이어게임 전용)
        updateGameState(props.roomId, 'category', categoryName);
        setWordGameData(categoryName);
    };

    const setWordGameData = async (categoryName) => {
        const gameData = await getWordGameCategory();
        let arr = [];
        gameData !== undefined && categoryName !== '' && Object.entries(gameData[categoryName]).map((data) => arr.push({
            quiz: data[0],
            answer: data[1]
        }));
        setWordGame(arr);
    }


    useEffect(() => {
        if (totalRound === 0) {
            getRandomArray(0, wordGame.length - 1, 2);
            console.log("dd")
        } else {
            getRandomArray(0, wordGame.length - 1, totalRound);
        }
    },[wordGame])

    useEffect(() => {
        updateGameState(props.roomId, 'test', random);
    },[random])


    // 카테고리 버튼을 누르면 data를 get
    // const getCategoryData = (categoryName) => {
    //     setSelectedCategory(categoryName);
    //     setWordGame([]);
    //     setWordGameData(categoryName)
    // };
    return (
        <>
            <div>
                <p id='categoryGuide'>원하는 카테고리를 선택해주세요</p>
                <div className='categoryList'>
                    {categories.slice(0, 4).map((cate) => <button className='categoryBtn'
                                                                  onClick={() => getCategoryData(cate)}>{cate}</button>)}
                    <br/>
                    {categories.slice(4, 8).map((cate) => <button className='categoryBtn'
                                                                  onClick={() => getCategoryData(cate)}>{cate}</button>)}
                    <br/>
                    {categories.slice(8, 11).map((cate) => <button className='categoryBtn'
                                                                   onClick={() => getCategoryData(cate)}>{cate}</button>)}
                </div>
            </div>
        </>
    )
}
