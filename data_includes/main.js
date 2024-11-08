PennController.ResetPrefix(null); // Shorten command names (keep this line here))
DebugOff()

PreloadZip('https://pcibexbucket.s3.us-east-2.amazonaws.com/stim.zip');
// load stim

// Define jitter settings
let min = 400; // ms
let max = 600; // ms

let jitterValues = [];
for (let i = min; i <= max; i += 10) {
    jitterValues.push(i);
}

// Function to select a random element from an array (for jitter)
function sample(array) {
    let sel = Math.floor(Math.random() * array.length / 10) * 10;
    return array[sel];
}


function SepWithN(sep, main, n) {
    this.args = [sep,main];


    this.run = function(arrays) {
        assert(arrays.length == 2, "Wrong number of arguments (or bad argument) to SepWithN");
        assert(parseInt(n) > 0, "N must be a positive number");
        let sep = arrays[0];
        let main = arrays[1];

        if (main.length <= 1)
            return main;
            
        else {
            let newArray = [];
            while (main.length){
                for (let i = 0; i < n && main.length>0; i++)
                    newArray.push(main.shift());
                for (let j = 0; j < sep.length; ++j)
                    newArray.push(sep[j]);
            }
            return newArray;
        }
    };
}
function sepWithN(sep, main, n) { return new SepWithN(sep, main, n); }

// Start with welcome screen, then present test trials in a random order,
// and show the final screen after sending the results
Sequence( "consent", "prolificid", "welcome" , "practiceInstructions",
          "practice1", "practice2", "practice3", "practice4", "begin", 
          sepWithN("break", randomize("test"), 50) , "send" , "final" )

Header( /* void */ )
    // This .log command will apply to all trials
    .log( "ID" , GetURLParameter("id") ) // Append the "ID" URL parameter to each result line

//Consent
newTrial("consent"
    ,
    defaultText
        .print()
    ,
    newText("Welcome!").color('white')
    ,
    newText("<p>Informed Consent Form for Adult Participants Earning Money via Online Platforms \
    IRB-FY2024-8720</p>").color('white')
    ,
    newText("You have been invited to take part in a research study to learn more about language processing in the \
    brain. This study will be conducted by Dr. Liina Pylkkänen, FAS - Psychology, Arts & Science, New York \
    University. If you agree to be in this study, you will be asked to do the following:").color('white')
    ,
    newText("<p> • Provide basic demographic information about your age, gender, country of birth, country of \
    residence, and linguistic background.</p>").color('white')
    ,
    newText("<p> • Complete an image matching task in which you are presented with two images and your \
    task is to indicate whether they are exactly the same.</p>").color('white')
    ,
    newText("<p>Participation in this study will take 30-45 minutes. Taking part in this study is \
    voluntary. You may refuse to participate or withdraw at any time without penalty. There are no known risks \
    associated with your participation in this research beyond those of everyday life. Although you will receive \
    no direct benefits for participation in this study, it may make you more aware of how knowledge is discovered\
    in psychology and help the investigator better understand how people process words, phrases, and sentences.\
    </p>").color('white')
    ,
    newText("<p>All data collected will be retained indefinitely, though no identifying information will be \
    collected or retained. All data will be accessible only to Dr. Liina Pylkkänen and her research associates.\
    Information not containing identifiers may be used in future research or shared with other researchers \
    without your additional consent.</p>").color('white')
    ,
    newText("<p>If there is anything about the study or taking part in it that is unclear or that you do not \
    understand, or if you have questions or wish to report a research-related problem, you may contact \
    the principal investigator, Dr. Liina Pylkkänen at +1-212-998-8764, liina.pylkkanen@nyu.edu, 10 Washington\
    Place Room 605, New York, NY, 10003.</p>").color('white')
    ,
    newText("<p>For questions about your rights as a research participant, you may contact the University \
    Committee on Activities Involving Human Subjects (UCAIHS), New York University, +1-212-998-4808\
    or ask.humansubjects@nyu.edu, 665 Broadway, Suite 804, New York, NY 10012.</p>").color('white')
    ,
    newText("<p>Click the button below to consent and begin the experiment.</p>").color('white')
    ,
    newButton("I consent to take part in this study")

        .center()
        .print()
        .wait()
)

// Prolific ID
newTrial( "prolificid" ,
    defaultText.center().print()
    ,
    newText("Please enter your Prolific ID:").color('white')
    ,
    newTextInput("inputprolificid")
    .center()
    .print()
    ,
    newButton("Confirm")
    .print()
    .center()
    .wait()
    ,
    newVar("prolificid")
    .global()
    .set( getTextInput("inputprolificid") )
)
.log("prolificid", getVar("prolificid") )

newTrial( "validation" ,
    defaultText.center().print()
    ,
    newText("To avoid auto-generated answers, please write the first three words that come to mind \
    when you see the word <strong>cat</strong>.").color('white')
    ,
    newTextInput("inputvalq")
    .center()
    .print()
    ,
    newButton("Indsend")
    .print()
    .center()
    .wait()
    ,
    newVar("valq")
    .global()
    .set( getTextInput("inputvalq") )
)
.log("valq", getVar("valq") )

// Welcome screen and logging user's ID
newTrial( "welcome" ,
    // We will print all Text elements, horizontally centered
    defaultText.center().print()
    ,
    newText("This is a matching task between two images of scenes. They will be presented very quickly one after the other.").color('white')
    ,
    newText("Your task is to determine if the two images are identical or different from one another.").color('white')
    ,
    newText("Press ‘2’ with your left findex finger if they are both SAME, and ‘1’ if they are both the DIFFERENT.").color('white')
    ,
    newText("2: Same").color("white")
    ,
    newText("1: Different").color("white")
    ,
    newText("Please use your left index finger to press ‘2’ and your left middle finger to press ‘1’.").color("white")
    ,
    newImage("hand1.png")
    .print()
    ,
    newText("The experiment will take approximately 30-45 minutes in total. You will be able to take breaks at set times during the experiment.").color('white')
    ,
    newText("When you are ready, press SPACE to continue.").color('white')
    ,
    newKey(" ").wait()  // Finish trial upon press on spacebar
)

newTrial( "practiceInstructions" ,
    // We will print all Text elements, horizontally centered
    defaultText.center().print()
    ,
    newText("You will now see a few practice trials.").color("white")
    ,
    newText("Each trial will consist of two images of scenes. Sometimes the images will be inverted or scrambled").color('white')
    ,
    newText("Remember, press ‘2’ with the LEFT INDEX FINGER if the two images are SAME, and press ‘1’ with the LEFT MIDDLE FINGER if the two images are the DIFFERENT.").color('white')
    ,
    newText("Answer as quickly and accurately as possible.").color('white')
    ,
    newText("When you are ready, press SPACE to do a practice run.").color('white')
    ,
    newKey(" ").wait()  // Finish trial upon press on spacebar
)

newTrial("break", 

    newVar("block_n", 0).global().set(v=>v+1) , 
    newVar("text").set(getVar("block_n")).set(v=>"You have now completed block "+v+" of 6.") , 
    newText("prompt", "").text(getVar("text")).print() , 
    newButton("Continue").print().center().wait() 
)

newTrial("practice1" ,
    // Text element at the top of the page to signal this is a practice trial
    newText("Practice").color("white").print("center at 50vw","top at 1em")
    ,
    // Display all future Text elements centered on the page, and log their display time code
    defaultText.center().print("center at 50vw","middle at 50vh")
    ,
    // Automatically start and wait for Timer elements when created
    defaultTimer.start().wait()
    ,
    // Mask, shown on screen for 500ms
    newText("mask","+").color('white'),
    newTimer("maskTimer", 200),                       
    getText("mask").remove()
    ,
    newText("mask2"," "),
    newTimer("mask2Timer", 200),                       
    getText("mask2").remove()    
    ,
    // Prime, shown on screen for 42ms
    newImage("prime","sun_ajxncqcvqyevolbb_altered_transposed_intact.png")
        .print("center at 50vw","middle at 50vh")
    ,
    newTimer("primeTimer", 300),
    getImage("prime").remove()
    ,
    newText("mask3"," "),
    newTimer("mask3Timer", 500),                       
    getText("mask3").remove()    
    ,    
    // Target
    newImage("target","sun_ajxncqcvqyevolbb_intact_transposed_intact.png")
        .print("center at 50vw","middle at 50vh")
        ,
        newTimer("targetTimer", 300),
    getImage("target").remove()
    ,
    // Mask shown on screen until 1 or 2 is pressed
    newText("mask4"," ")
    ,   
    newKey("answerTarget", "12")
        .wait()                
        .test.pressed("1")    
        .success( 
            getImage("target").remove(),
            newText("correct", "Correct")
            .color("white")
            .print("center at 50vw","center at 25vh"),
            newTimer(" ", 500)
            //.wait()
            //getTooltip("guide").text("<p>No, the second word was <em>read</em>.</p> You should have pressed H.") 
        )
        .failure( 
            getImage("target").remove(),
            newText("incorrect", "Wrong")
            .color("white")
            .print("center at 50vw","center at 25vh"),
            newTimer("  ", 500)
            )
    ,
    newText("jitter", " "),
    newTimer("jitterTimer", 450),
    getText("jitter").remove()
    
)

newTrial("practice2" ,
    // Text element at the top of the page to signal this is a practice trial
    newText("Practice").color("white").print("center at 50vw","top at 1em")
    ,
    // Display all future Text elements centered on the page, and log their display time code
    defaultText.center().print("center at 50vw","middle at 50vh")
    ,
    // Automatically start and wait for Timer elements when created
    defaultTimer.start().wait()
    ,
    // Mask, shown on screen for 500ms
    newText("mask","+").color('white'),
    newTimer("maskTimer", 200),                       
    getText("mask").remove()
    ,
    newText("mask2"," "),
    newTimer("mask2Timer", 200),                       
    getText("mask2").remove()    
    ,
    // Prime, shown on screen for 42ms
    newImage("prime","sun_aalcoddsgakiyibg_intact_intact_intact.png")
        .print("center at 50vw","middle at 50vh")
    ,
    newTimer("primeTimer", 300),
    getImage("prime").remove()
    ,
    newText("mask3"," "),
    newTimer("mask3Timer", 500),                       
    getText("mask3").remove()    
    ,    
    // Target
    newImage("target","sun_aalcoddsgakiyibg_intact_intact_intact.png")
        .print("center at 50vw","middle at 50vh")
        ,
        newTimer("targetTimer", 300),
    getImage("target").remove()
    ,
    // Mask shown on screen until 1 or 2 is pressed
    newText("mask4"," ")
    ,   
    newKey("answerTarget", "12")
        .wait()                 // Only proceed after a keypress on F or J
        .test.pressed("2")      // Set the "guide" Tooltip element's feedback text accordingly
        .success( 
            getImage("target").remove(),
            newText("correct", "Correct")
            .color("white")
            .print("center at 50vw","center at 25vh"),
            newTimer(" ", 500)
            //.wait()
            //getTooltip("guide").text("<p>No, the second word was <em>read</em>.</p> You should have pressed H.") 
        )
        .failure( 
            getImage("target").remove(),
            newText("incorrect", "Wrong")
            .color("white")
            .print("center at 50vw","center at 25vh"),
            newTimer("  ", 500)
            )
    ,
    newText("jitter", " "),
    newTimer("jitterTimer", 600),
    getText("jitter").remove()
    
)

newTrial("practice3" ,
    // Text element at the top of the page to signal this is a practice trial
    newText("Practice").color("white").print("center at 50vw","top at 1em")
    ,
    // Display all future Text elements centered on the page, and log their display time code
    defaultText.center().print("center at 50vw","middle at 50vh")
    ,
    // Automatically start and wait for Timer elements when created
    defaultTimer.start().wait()
    ,
    // Mask, shown on screen for 500ms
    newText("mask","+").color('white'),
    newTimer("maskTimer", 200),                       
    getText("mask").remove()
    ,
    newText("mask2"," "),
    newTimer("mask2Timer", 200),                       
    getText("mask2").remove()    
    ,
    // Prime, shown on screen for 42ms
    newImage("prime","sun_btylpseeemoqeamc_intact_intact_rotated.png")
        .print("center at 50vw","middle at 50vh")
    ,
    newTimer("primeTimer", 300),
    getImage("prime").remove()
    ,
    newText("mask3"," "),
    newTimer("mask3Timer", 500),                       
    getText("mask3").remove()    
    ,    
    // Target
    newImage("target","sun_btylpseeemoqeamc_altered_intact_rotated.png")
        .print("center at 50vw","middle at 50vh")
        ,
        newTimer("targetTimer", 300),
    getImage("target").remove()
    ,
    // Mask shown on screen until 1 or 2 is pressed
    newText("mask4"," ")
    ,   
    newKey("answerTarget", "12")
        .wait()                 // Only proceed after a keypress on F or J
        .test.pressed("1")      // Set the "guide" Tooltip element's feedback text accordingly
        .success( 
            getImage("target").remove(),
            newText("correct", "Correct")
            .color("white")
            .print("center at 50vw","center at 25vh"),
            newTimer(" ", 500)
            //.wait()
            //getTooltip("guide").text("<p>No, the second word was <em>read</em>.</p> You should have pressed H.") 
        )
        .failure( 
            getImage("target").remove(),
            newText("incorrect", "Wrong")
            .color("white")
            .print("center at 50vw","center at 25vh"),
            newTimer("  ", 500)
            )
    ,
    newText("jitter", " "),
    newTimer("jitterTimer", 550),
    getText("jitter").remove()
    
)

newTrial("practice4" ,
    // Text element at the top of the page to signal this is a practice trial
    newText("Practice").color("white").print("center at 50vw","top at 1em")
    ,
    // Display all future Text elements centered on the page, and log their display time code
    defaultText.center().print("center at 50vw","middle at 50vh")
    ,
    // Automatically start and wait for Timer elements when created
    defaultTimer.start().wait()
    ,
    // Mask, shown on screen for 500ms
    newText("mask","+").color('white'),
    newTimer("maskTimer", 200),                       
    getText("mask").remove()
    ,
    newText("mask2"," "),
    newTimer("mask2Timer", 200),                       
    getText("mask2").remove()    
    ,
    // Prime, shown on screen for 42ms
    newImage("prime","sun_bzzvbegxtfxrnaqh_altered_transposed_intact.png")
        .print("center at 50vw","middle at 50vh")
    ,
    newTimer("primeTimer", 300),
    getImage("prime").remove()
    ,
    newText("mask3"," "),
    newTimer("mask3Timer", 500),                       
    getText("mask3").remove()    
    ,    
    // Target
    newImage("target","sun_bzzvbegxtfxrnaqh_altered_transposed_intact.png")
        .print("center at 50vw","middle at 50vh")
        ,
        newTimer("targetTimer", 300),
    getImage("target").remove()
    ,
    // Mask shown on screen until 1 or 2 is pressed
    newText("mask4"," ")
    ,   
    newKey("answerTarget", "12")
        .wait()                 // Only proceed after a keypress on F or J
        .test.pressed("2")      // Set the "guide" Tooltip element's feedback text accordingly
        .success( 
            getImage("target").remove(),
            newText("correct", "Correct")
            .color("white")
            .print("center at 50vw","center at 25vh"),
            newTimer(" ", 500)
            //.wait()
            //getTooltip("guide").text("<p>No, the second word was <em>read</em>.</p> You should have pressed H.") 
        )
        .failure( 
            getImage("target").remove(),
            newText("incorrect", "Wrong")
            .color("white")
            .print("center at 50vw","center at 25vh"),
            newTimer("  ", 500)
            )
    ,
    newText("jitter", " "),
    newTimer("jitterTimer", 500),
    getText("jitter").remove()
    
)


newTrial( "begin" ,
    // We will print all Text elements, horizontally centered
    defaultText.center().print()
    ,
    newText("We are now ready to start the experiment.").color('white')
    ,
    newText("You will see the same types of trials in the actual experiment, but this time you will not receive feedback on your responses.").color("white")
    ,
    newText("REMEMBER:")
        .color('white')
        .bold()
    ,
    newText("Press 2 with the LEFT INDEX FINGER if the two images are the SAME.").color('white')
    ,
    newText("Press 1 with the LEFT MIDDLE FINGER if the two images are DIFFERENT from each other.").color('white')
    ,
    newText("Press SPACE when you are ready to begin the experiment.").color('white')
    ,
    newKey(" ").wait()  // Finish trial upon press on spacebar
)


// Executing experiment from stimuli.csv table, where participants are divided into two groups (A vs B)
Template( "stimuli_jitter.csv" , 
    row => newTrial( "test" ,   
        jitter = sample(jitterValues)
        ,
        // Display all Text elements centered on the page, and log their display time code
        defaultText.center().print("center at 50vw","middle at 50vh").log()
        ,
        // Automatically start and wait for Timer elements when created, and log those events
        defaultTimer.log().start().wait()
        ,
        // Mask, shown on screen for 200ms
        newText("mask","+").color('white'),
        newTimer("maskTimer", 200),                       
        getText("mask").remove()
        ,
        // Mask, shown on screen for 200ms
        newText("mask2","  "),
        newTimer("mask2Timer", 200),                       
        getText("mask2").remove()
        ,
        // Prime, shown on screen for 300ms
        // filepath = "sun_"+row.prime,
        newImage("Prime",row.prime)
         .print("center at 50vw","middle at 50vh")
        ,
        console.log(row.prime)
        ,
        newTimer("primeTimer", 300),
        getImage("Prime").remove()
        ,
        // Mask, shown on screen for 500ms
        newText("mask3","  "),
        newTimer("mask3Timer", 500),                       
        getText("mask3").remove()
        ,        
        // Target, shown on screen for 300ms
        // filepathtarget = "sun_"+row.target,
        newImage("Target",row.target)
         .print("center at 50vw","middle at 50vh")
        ,
        console.log(row.target)
        ,
        newTimer("targetTimer", 300),
        getImage("Target").remove()
        ,
        // Mask, shown on screen for 500ms
        newText("mask4","  ")
        ,
        newKey("answerTarget", "12").log().wait()   // Proceed upon press on 1 or 2 (log it)
        ,
        getText("mask4").remove() // End of trial, move to next one
        , 
        newText("jitter", " "),
        newTimer("jitterTimer", jitter),
        getText("jitter").remove()
        
    )
    .log( "uid", row.uid )
    .log( "match?", row.match )
    .log( "prime", row.prime )
    .log( "target", row.target )
    .log( "jitter", jitter )
    .log( "trial_id",row.trial_id )
    
// group,match,prime,target,noun,adjective,order,lexical,swap_cat,swap_word,swap_index,trial_id
)

// Send the results
SendResults("send")

// A simple final screen
newTrial ( "final" ,
    newText("The experiment is now over. Thank you for your time!")
        .print()
    ,
    newText("<p><a href='https://app.prolific.com/submissions/complete?cc=C1EFQBKR' target='_blank'>Please click this link to confirm your participation and return to Prolific.</a></p>")
        .print()
    ,

    // Stay on this page forever
    newButton().wait()
)


