import { useState, useEffect, useRef } from 'react';
import * as Tone from 'tone'

import loop1 from "sounds/Loop1.wav";
import loop2 from "sounds/Loop2.wav";
import loop6 from "sounds/Loop6.wav";
import loop8 from "sounds/Loop8.wav";

export default function useSounds() {
    const mySampler = useRef(null);

    const [isLoo1Played, isLoop1PlayedChange] = useState(false);
    const [isLoo2Played, isLoop2PlayedChange] = useState(false);
    const [isLoo6Played, isLoop6PlayedChange] = useState(false);
    const [isLoo8Played, isLoop8PlayedChange] = useState(false);

    useEffect(() => {
        const sampler = new Tone.Sampler({
            "C4": loop1,
            "D#4": loop2,
            "F#4": loop6,
            "A4": loop8,
        }).toDestination();

        Tone.loaded().then(() => {
            mySampler.current = sampler;
        })
    }, [])

    function soundPlay(note) {
        mySampler.current.triggerAttackRelease([note], 4)
    }

    function handleKeyDown({ key }) {
        switch (key) {
            case "a":
                isLoop1PlayedChange(true)
                window.setTimeout(() => isLoop1PlayedChange(false), 300)
                soundPlay("C4")
                break;
            case "z":
                window.setTimeout(() => isLoop2PlayedChange(false), 300)
                isLoop2PlayedChange(true)
                soundPlay("D#4")
                break;
            case "e":
                window.setTimeout(() => isLoop6PlayedChange(false), 300)
                isLoop6PlayedChange(true)
                soundPlay("F#4")
                break;
            case "r":
                window.setTimeout(() => isLoop8PlayedChange(false), 300)
                isLoop8PlayedChange(true)
                soundPlay("A4")
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", handleKeyDown)

        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    });

    const buttonList = [
        {
            soundPlay: () => soundPlay("C4"),
            isPlayed: isLoo1Played,
        },
        {
            soundPlay: () => soundPlay("D#4"),
            isPlayed: isLoo2Played,
        },
        {
            soundPlay: () => soundPlay("F#4"),
            isPlayed: isLoo6Played,
        },
        {
            soundPlay: () => soundPlay("A4"),
            isPlayed: isLoo8Played,
        },
    ];

    return { buttonList };
}