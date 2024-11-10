import { round } from './util.js';
import { fetchTierLength, fetchTierMinimum } from "./content.js";

// ------------------------------------------------------------------------------------------
// Welcome to the site's configuration! This file allows us to change: 
//      - The formula used anytime the site needs to calculate a score (level, record, and
          // pack scores)
//      - The colors a pack is displayed as
//      - The amount of decimals the site will globally round to and display
// Additionally, notes have been provided to explain exactly what everything does, especially
// to non programmers. Notes are denoted using "//", as seen here.
// ------------------------------------------------------------------------------------------

export const scale = 1; // Amount of decimals the site will globally round to and display.

export const maxDiff = 10; // The highest difficulty number, used for some logic in the search bar.

// ------------------------------------------------------------------------------------------
// Information about imported functions:
//      - round takes in a number and rounds it to the nearest nth decimal, where n is the
//        number of decimals the site will globally round to.
//      - fetchTierLength takes in the list data and a specific difficulty, then outputs the
//        amount of levels in that difficulty.
//      - fetchTierMinimum takes in the list data and a specific difficulty, then outputs
//        the level in that difficulty with the GREATEST rank (lowest-placed on the list).
// ------------------------------------------------------------------------------------------


// -------------------------------------
// Score function (levels and records):
// -------------------------------------
export function score(rank, percent, minPercent) {
    if (rank > 150) {
        return 0;
    }
    if (rank > 75 && percent < 100) {
        return 0;
    }

    // Old formula
    /*
    let score = (100 / Math.sqrt((rank - 1) / 50 + 0.444444) - 50) *
        ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));
    */
    // New formula
    let score = (-24.9975*Math.pow(rank-1, 0.4) + 200) *
        ((percent - (minPercent - 1)) / (100 - (minPercent - 1)));

    score = Math.max(0, score);

    if (percent != 100) {
        return round(score - score / 3);
    }

    return Math.max(round(score), 0);
}

// ------------------------
// Score function (packs):
// ------------------------
export function packScore(pack) {
    let packscore = 0; // Initialize packscore

    // Code between the '/*' and '*/' symbols is ignored / disabled.
    // This code used to score packs based on the levels they contain, if any.

    /* if (pack.levels) { // Checks if the pack has definitive levels associated with it

        // Sets packscore to the average of the scores of the levels in the pack
        let totalScore = 0
        pack.levels.forEach((lvl) => {
            totalScore += score(lvl.rank, lvl.difficulty, 100, lvl.percentToQualify, list)
        })
        packscore = totalScore / pack.levels.length
    } 

    else { // If the pack does not have definitive levels associated with it (if it is
           // a difficulty pack) */

        // For help figuring out how this switch statement works, look at the comments on
        // the switch statement in the score function above.
        switch (pack.difficulty) { // Set the pack's score based on its difficulty.
            case 0:

                /* Beginner Packs */
                packscore = 5;
                break;
            case 1:

                /* Easy Packs */
                packscore = 15;
                break;
            case 2:

                /* Medium Packs */
                packscore = 30;
                break;
            case 3:

                /* Hard Packs */
                packscore = 50;
                break;
            case 4:

                /* Insane Packs */
                packscore = 70;
                break;
            case 5:

                /* Mythical Packs */
                packscore = 100;
                break;
            case 6:

                /* Extreme Packs */
                packscore = 150;
                break;
            case 7:

                /* Legendary Packs */
                packscore = 200;
                break;
            default:

                /* if the pack's difficulty does not correspond to a "case" above */
                packscore = null;
                break;
        }
 // } Ignore this bracket, it is part of the commented out code above.

    // if the packscore is not "null" (i.e. if the difficulty is not in 
    // the above switch statement), round before returning it.
    return packscore === null ? packscore : round(packscore);
}

// ------------------------
// Light mode pack colors:
// ------------------------
export function lightPackColor(difficulty) {
    // NOTE: The site uses rgba values for the colors of packs.
    //      - r is the red content of the color.
    //      - g is the green content of the color.
    //      - b is the blue content of the color.
    //      - a is the alpha/opacity of the color (think alpha trigger in Geometry Dash).
    //      - The values of r, g, and b are integers between 0 and 255, inclusive.
    //      - The value of a is a number between 0 and 1, inclusive.

    // If you're not on mobile, an easy way to select and test these values is to open
    // inspect element, click on a pack's button, and find something that looks like this:
    // https://imgur.com/a/6q2MsTj. From there, you're able to change the color in real
    // time (on your device only). When you're done, copy the values from above the color
    // picker and fill them into the switch statement below.

    // Also, keep in mind that these are the values used *while the pack is selected*.
    // If a pack is deselected or the user is only hovering over it, the opacity will
    // decrease.

    // Initialize r, g, b, and a values
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 1; // The site assumes the opacity is 1, unless specified below.
    
    // For help figuring out how this switch statement works, look at the comments on
    // the switch statement in the score function above.
    switch (difficulty) { // Set the pack's color based on its difficulty.
        case 0:

            /* Beginner Packs */
            r = 255;
            g = 23;
            b = 139;
            a = 0.9;
            break;
        case 1:

            /* Easy Packs */
            r = 52;
            g = 107;
            b = 235;
            break;
        case 2:

            /* Medium Packs */
            r = 52;
            g = 150;
            b = 82;
            break;
        case 3:

            /* Hard Packs */
            r = 213;
            g = 239;
            b = 16;
            a = 0.9;
            break;
        case 4:

            /* Insane Packs */
            r = 255;
            g = 120;
            a = 0.9;
            break;
        case 5:

            /* Mythical Packs */
            r = 147;
            g = 24;
            b = 255;
            a = 0.9;
            break;
        case 6:

            /* Extreme Packs */
            r = 255;
            a = 0.9;
            break;
        case 7:

            /* Legendary Packs */
            r = 25;
            g = 25;
            b = 25;
            a = 0.8;
            break;
        default:
            
            /* If there's a mistake */
            break;
    }
    return [r, g, b, a];
}

// ------------------------
// Dark mode pack colors:
// ------------------------
export function darkPackColor(difficulty) {
    // NOTE: The site uses rgba values for the colors of packs.
    //      - r is the red content of the color.
    //      - g is the green content of the color.
    //      - b is the blue content of the color.
    //      - a is the alpha/opacity of the color (think alpha trigger in Geometry Dash).
    //      - The values of r, g, and b are integers between 0 and 255, inclusive.
    //      - The value of a is a number between 0 and 1, inclusive.

    // If you're not on mobile, an easy way to select and test these values is to open
    // inspect element, click on a pack's button, and find something that looks like this:
    // https://imgur.com/a/6q2MsTj. From there, you're able to change the color in real
    // time (on your device only). When you're done, copy the values from above the color
    // picker and fill them into the switch statement below.

    // Also, keep in mind that these are the values used *while the pack is selected*.
    // If a pack is deselected or the user is only hovering over it, the opacity will
    // decrease.

    // Initialize r, g, b, and a values
    let r = 0;
    let g = 0;
    let b = 0;
    let a = 1; // The site assumes the opacity is 1, unless specified below.
    
    // For help figuring out how this switch statement works, look at the comments on
    // the switch statement in the score function above.
    switch (difficulty) { // Set the pack's color based on its difficulty.
        case 0:

            /* Beginner Packs */
            r = 197;
            g = 12;
            b = 105;
            a = 0.9;
            break;
        case 1:

            /* Easy Packs */
            r = 0;
            g = 53;
            b = 177;
            a = 0.9;
            break;
        case 2:

            /* Medium Packs */
            r = 17;
            g = 137;
            b = 54;
            a = 0.8;
            break;
        case 3:

            /* Hard Packs */
            r = 204;
            g = 209;
            a = 0.8;
            break;
        case 4:

            /* Insane Packs */
            r = 211;
            g = 99;
            a = 0.9;
            break;
        case 5:

            /* Mythical Packs */
            r = 117;
            g = 13;
            b = 209;
            a = 0.9;
            break;
        case 6:

            /* Extreme Packs */
            r = 217;
            g = 6;
            b = 6;
            a = 0.9;
            break;
        case 7:

            /* Legendary Packs */
            r = 200;
            g = 200;
            b = 200;
            a = 0.8;
            break;
        default:

            /* If there's a mistake */
            break;
    }
    return [r, g, b, a];
}