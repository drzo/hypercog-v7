OpenCogHyperon:AFrameworkforAGI attheHumanLevelandBeyond – 
High-Level Background & Introduction 
BenGoertzel,VitalyBogdanov,MichaelDuncan,DeborahDuong,ZarathustraGoertzel,JanHorlings,MatthewIkle’,LuciusGregMeredith,AlexeyPotapov,Andre’ LuizdeSenna,HedraSeid,AndresSuarez,AdamVandervorst,RobertWerko * 
October31,2023 
Abstract 
AnintroductiontotheOpenCogHyperonframeworkforArtificiaiGeneralIn­
telligenceispresented. Hyperonisanew,mostlyfrom-the-ground-uprewrite/redesign
ofthe OpenCog AGIframework, basedon similar conceptualand cognitive prin­
ciplestothepreviousOpenCogversion,butincorporatingavarietyofnewideasat
themathematical,softwarearchitectureandAI-algorithmlevel. Thisreviewlightly
summarizes 
• 
someofthehistorybehindOpenCogandHyperon 

• 
thecorestructuresandprocessesunderlyingHyperonasasoftwaresystem 

• 
theintegrationofthissoftwaresystemwiththeSingularityNETecosystem’sdecentralizedinfrastructure 

• 
thecognitivemodel(s)beingexperimentallypursuedwithinHyperononthehopefulpathtoadvancedAGI 

• 
theprospectsseenforadvancedaspectslikereflectiveself-modificationandself-improvementofthecodebase 


*Goertzel is primary author with affiliations SingularityNET, TrueAGI, OpenCog; other co-authors arelistedalphabetically 
1 
• the tentative development roadmap and various challenges expected to befaced 
• thethinkingoftheHyperonteamregardinghowtoguidethissortofworkinabeneficialdirection. 
and gives links and references for readers who wish to delve further into any oftheseaspects. 
Contents 
1 
Introduction 
3 
2 
SnapshotsAlongthePathtoHyperon 
5 
2.1 
(SomeAspectsOf)theConceptionofIntelligenceBehindHyperon 
. . 5 
2.2 
WhatisaMindthatWeMightBuildOne? 
............... 8 
2.3 
APartialPrehistoryofHyperon 
.................... 9 
3 
OpenCogHyperon:AModern,ScalableInfrastructureforAGI 
12 
3.1 
AtomspaceandMeTTa:TheCoreConstructsofOpenCog 
...... 12 
3.1.1 
TheNecessityofOneMoreProgrammingLanguage 
. . . . . 16 
3.1.2 
MeTTainaNutshell 
...................... 18 
3.1.3 
OptimizingtheMeTTaInterpreterforAGI 
. . . . . . . . . . 22 
3.1.4 
SomeChallengesfortheNextPhaseofMeTTaDevelopment 
. 23 
3.2 
Hyperon’sPositionintheEraofLLMs 
................. 27 
3.3 
SpecializedSpaceswithDiverseRoles 
. . . . . . . . . . . . . . . . . 29 
3.3.1 
TheDistributedAtomspace 
.................. 31 
3.4 
DecentralizedDeploymentviaBlockchainIntegration 
......... 33 3.5 
CompilingMeTTatoRholangforRapidSecureDecentralizedExecution 
37 
3.6 
TheNeedforaCognitiveAGIR&DPlatform 
. . . . . . . . . . . . . 41 
4 
TheCogPrimeCognitiveModel(andBeyond) 
43 
4.1 
CogPrime:Hyperon’sHistoricalDefaultCognitiveModel 
...... 44 
4.2 
TowardaGeneralTheoryofGeneralIntelligence 
. . . . . . . . . . . 52 
4.3 
Hyperon,CogPrimeandtheStandardModelof(Human-Like)Mind 
. 56 
4.3.1 
EpisodicMemory 
........................ 57 
4.3.2 
WorkingMemory 
........................ 59 
4.3.3 
ProceduralMemory 
...................... 60 
4.3.4 
Reasoning 
............................ 61 
4.3.5 
ReinforcementLearning 
.................... 68 
4.3.6 
LanguageLearningandUsage 
................. 69 
4.3.7 
MultimodalPerception 
..................... 71 
4.3.8 
ActionLearningandCoordinatedAction 
. . . . . . . . . . . 72 
4.3.9 
GoalRefinementandGoalSystemManagement 
. . . . . . . 72 
4.3.10 
ReflexiveSelf-Understanding 
. . . . . . . . . . . . . . . . . 72 
4.3.11 
ModelingandUnderstandingofOtherMinds 
. . . . . . . . . 73 
4.4 
WhatIsItLiketoBeaHyperon? 
.................... 73 
4.4.1 
WorldModeling 
........................ 74 
4.4.2 
Emotion 
............................. 74 
4.4.3 
Creativity 
............................ 77 
4.4.4 
Consciousness 
......................... 77 
4.5 
HyperonasanInfrastructureforAlternateCognitiveArchitectures 
. . 78 
4.5.1 
HyperonasanInfrastructureforSISTER 
. . . . . . . . . . . 79 
4.6 
HyperonasaFoundationforSuperintelligence 
. . . . . . . . . . . . 80 
4.6.1 
HyperonandUniversalAIMethods 
. . . . . . . . . . . . . . 83 
4.6.2 
Complexity, 
Self-Organization 
and 
Emergence 
on 
the 
Path 
toSuperintelligence 
........................ 85 
5 
Hyperon’s 
Development 
Path 
86 
5.1 
ScalingUptheHyperonDevelopmentCommunity 
. . . . . . . . . . 87 
5.2 
PotentialEarlyDemonstrationsandApplications 
. . . . . . . . . . . 88 
5.3 
Commercialization 
........................... 89 
5.4 
AchievingBeneficialAGI 
........................ 92 
6 
Concluding 
Remarks 
95 
1 Introduction 
The initial goal of the AI field, at its founding in the middle of the last century, wasthe creation of machines with general intelligence capability at the human level andthen beyond. When this proved more difficult than anticipated, however, the AI fieldshifted substantially toward ”narrow AI” systems focused on carrying out particulartasks effectively rather than on more general-purpose adaptation and self-and world-understanding.
With modern compute power, sensor power and data availability, though, enthu­siasm for Artificial General Intelligence is resurgent and at an all time high. It is no longersouncommontohearambitiousprojectionsregardinghuman-levelAGIpoten­tiallybeingachievableinsomesingle-digitnumberofyears.
TheauthorsofthisarticlehavebeenoptimisticabouttheoutlookforAGIformuchlonger than this sort of attitude has been fashionable; however, we also feel that to achieve the grand goal of general intelligence at the human level and then beyond, itwillbenecessarytograppleabitwiththesubtletyoftheproblem. Human-levelAGIisnot theend-all ofAGIby any means,but itdoes havequitealot ofinterdependent di­mensions,andwebelieveitwilldefyachievementviasimplisticcognitivearchitectures(likecurrentLLMsoranythingcenteredonthese).
What 
we 
describe 
here 
is 
OpenCog 
Hyperon 
[GP21], 
a 
cognitive 
architecture 
andAIsystemdesignthatwebelievepossessesthebreadthandcomplexitytoachieveAGIat the human level and beyond, via a combination of autonomous learning and hu­man education and supervision. Hyperon is a new system in the OpenCog lineage,foundedonthesamecorecognitivetheoriesandhighleveldesignconceptsastheear­lier”OpenCogClassic”system[Goe10],butredesignedfromthegroundupforgreaterscalability, usability and mathematical elegance. We give here a high level overviewoftheOpenCogHyperonsystem,inclusiveofvarioustheoreticalandpracticalpursuitsthathaveevolvedaroundthisin-progresssoftwaresystemanditsdesign.
Those who have been in the AI or AGI field for a while understand that ”branded software systems” like Hyperon are generally not as fundamentally significant as theymay appear froma technologicalstandpoint, though theyare clearly important fromasociological,marketing,orattention-gatheringperspective. Underthename”OpenCogHyperon”, we are bringing together diverse algorithms, data structures, mathematicalideas,cognitivesystemtheories,andcode –whichhaverichinterrelationshipandalsoindependentmeaning,andcommonuseinputtingtogether,usingandunderstandingtheHyperon software system. Some of the discussions here will be specifically about theOpenCog Hyperon codebase and practical applications, while others will touch upontheoretical ideas and concepts that have been integrated into Hyperon from varioussources,andalsohavesignificantvaluebeyondthescopeofHyperon.
The discussion hereismostly ata high-level technical overview level. The http: 
//hyperon.opencog.org 
website contains links to various documents, videos and coderepositoriesthatdelveintomorespecificaspects. ThereaderinterestedinamorethoroughtreatmentofcognitivetheoryrelatedtoHyperonisalsoreferredtoGoertzel’s2021paperonGeneral Theory of General Intelligence [Goe21d].
A brief note on expository style: This is an informal text put together by a groupof authors who have been working together to make Hyperon a reality. We’ve chosen aslightlyunusualformat,inwhichthird-personproseisintermixedwithdirectquotes in the first person from various contributors. The purpose of this is to make thingsalittle less dry andimpersonal, and to get acrossthe realitythat thissortof R&Dandengineeringisnotanabstractandfacelesspursuitbutrathertheintersectionandsynergyof the work, passion and insight of a community of specific human beings, each ofwhombringstheirownperspectiveandpeculiaritiestotheproject. 1 


2 SnapshotsAlongthePathtoHyperon 
While the crux of this article is a rough description of the concrete approach to AGIbeing taken in the Hyperon software R&D project, we feel it is important to situatethistechnicalprojectappropriatelywithinthebroaderquestofunderstanding”whatisamindthatwemightbuildone?"
Today AI and to an extent even AGI is a major commercial and practical pursuit,andasubstantial portionofnewentrantsinto thefieldareunderstandablyorientedto­ward what they can do right now with the amazing tools that are available. However,the OpenCog project emerged from a previous phase in the AI field, where hardwareanddataresourceswerenotsufficienttosupportsuchrapidexperimentation, andthusprogress was largely driven by conceptual investigation – i.e. AI R&D was deeplyboundupwiththeintellectualquesttounderstandthenatureofintelligence. 
2.1 (Some Aspects Of) the Conception of Intelligence Behind Hy­peron 
InatalkgivenattheHyperonworkshopattheAGI-23conferenceinStockholminJune2023 
[Goe21a], 
Hyperon 
co-founder 
Ben 
Goertzel 
reviewed 
some 
of 
the 
conceptionsofgeneralintelligenceunderlyinghisworkontheHyperonsystemanditspredecessors.(WhilethesethoughtsofBen’sarehighlyrelevant,itshouldalsoberememberedthatasystemlikeHyperonisnotsolelytheproductofoneperson,andtheremaybedifferentperspectivesonhowitcameaboutandwhyitexists.) 
’My engagement with AI started in the early 1970s, when I began reading about AI in science fiction and popular science articles. By the late 70s and early 80s, I became somewhat disillusioned with the academic field of AI, which seemed to primarily involve rule-based production systems. These systems 
1Itshouldbenotedthatwhile some oftheco-authorsofthispaperhavebeenverymajorcontributorsto Hyperon (e.g. Alexey Potapov, Andre’ Senna and Matt Ikle’ have been. major co-creators and others havealsocontributedsignificantly),theco-authorlistisnotalistofHyperoncreators. Someoftheco-authorshavebeen on the periphery of the Hyperon project; and some major Hyperon contributors have not contributeddirectlytothisarticleforvariouslogisticalreasons. 
appeared tedious and ill-conceived to me, not because I had any aversion to logic, but because the thought of manually encoding all the knowledge required for human-like cognition seemed absurd. However, as I began programming AI systems, I started to comprehend why the AI field was dominated by such systems ? achieving anything with self-organizing systems was immensely challenging. 
”Another intriguing facet I discovered, in my late teens as I initially explored the AI field, was the surprising viability of narrow AI. The existence of an AI system that could play checkers at a level superior to my own abilities seemed greatly impressive to my teenage mind, given the limited computing resources available at the time. This raised some perplexing questions about the dichotomy between narrow AI and AGI. It was a nontrivial discovery, in the 1960s and 70s, that tasks appearing to require significant general intelligence when humans do them could often be done successfully by quite simple algorithms. I understood why some researchers had started to think maybe human-level AGI was just a grab bag of narrow tricks carrying out various tasks that had been evolutionarily important to humans. 
”On the other hand, we are now reaching a point in the evolution of the AI field where employing more AGI-oriented approaches is sometimes the most effective way to address practical problems, sometimes better than deploying simple narrow techniques even when one is operating under the severe time and resource constraints characteristic of real-world application problems. 
”As I progressed through my education, getting a PhD in mathematics with a view toward understanding the mathematics of human and machine minds, I spent some time attempting to formalize the concept of general intelligence. I settled in my 1991 book The Structure of Intelligence on the notion of general intelligence as the ability to achieve complex goals in complex environments (and then sought to formalize the relevant notions of complexity in terms of algorithmic information theory) – a related approach to the formal definition of general intelligence given by Legg and Hutter in 2007 or so. Narrow AIs, in this sense, tend to pursue a less complex range of goals and to operate best in contexts that are well prepared and curated by the humans or other software systems around them. 
”I much later encountered Weaver – aka David Weinbaum – who wrote his 2018 Ph.D. thesis on open-ended intelligence at the Free University of Brussels [WV17]. 
Weinbaum approached the topic from a Continental philosophy perspective, examining intelligence as a complex, self-organizing, autopoietic (self-rebuilding) system. According to his view, intelligent systems are engaged in the pursuit of individuation, meaning they persist in maintaining their existence with a boundary around them, while also seeking self-transcendence by striving to evolve into something beyond themselves. He posits that achieving a goal or working towards a reward function is not the core of what makes a system intelligent. 
Rather, it is the self-organizing network flowing toward individuation and self-transcendence that may sometimes originate goals (implicit or explicit) and act in ways that approximate maximizing those goals. However, this self-organization can cause goals to vanish and new ones to emerge. I find that this resonates with my personal experience as a goal-oriented person. Even though I often set goals, I tend to redefine or abandon them in the process of pursuing them. 
”I found Weaver’s conception of intelligence tied in AGI theory with complex systems theory in a quite satisfying, even if partly impressionistic and not fully scientifically/mathematically rigorous, way. In the context of Weaver’s concept of open-ended intelligence, achieving a goal is not the crux of intelligence. Rather, the focus is on the self-organizing aspect. For instance, an intelligent system may work towards a reward function for some time during its existence, but this is not what fundamentally makes the system intelligent. Instead, the self-organizing network, flowing towards individuation and self-transcendence, may sometimes originate goals, which may be implicit or explicit. It may act in ways that approximate maximizing those goals, but then the self-organization might cause that goal to dissipate, and lead another goal to bubble up. This dynamic nature of goal formation and the pursuit of self-transcendence felt relatable to how my own life has unfolded. 
”Weaver’s perspective made me reevaluate my previous fixation on achieving complex goals in complex environments, and I became more open to various viewpoints on general intelligence. It also led me to appreciate that a crisp definition is not necessary and that general intelligence may be multi-dimensional and somewhat nebulous. 
”Hyperon is intended as a system that can achieve complex goals in complex environments, including goals that it represents explicitly as well as goals that arise implicitly due to its self-organizing dynamics. It is also intended as an open-ended intelligence that, as it pursues its self-organization and its agency, ongoingly pursues both individuation and self-transcendence.” 
IntheconceptualapproachtoAGIunderlyingHyperon,human-levelgeneralintel­ligenceisanin-some-sensesarbitrarywaypointonthepathtomoreandmoregenerallyintelligentsystems. Hyperon’sbasicarchitecturedrawsrichlyonhumancognitivesci­ence, yet does not try to emulate human mind or brain in detail, and as a result is notbound to human levels of rationality, insight, analytic skill or creativity (nor bound tohuman levels of ethics or compassion for that matter). General conceptions of AGI like”achievingcomplexgoalsincomplexenvironments”and”balancingindividuation withself-transcendence”dodescribealotofwhathumansdo,buttheyalsoareclearlythingsatwhichhumansaremerelyso-socomparedtootherfeasiblephysicalsystems. 
MakingAGIsthatunderstandandrelatetohumanintelligenceisanimportantthingforhumanity,butHyperonisintendedasadesignthatwillbeabletoachievethisalongsidevariousformsofintelligenceconsiderablyexceedingthehumanlevel. 

2.2 What is a Mind that We Might Build One? 
ContinuingtoextractfromthesameAGI-23talk,BenGoertzelrecountedtherethat: 
”The quest to understand the nature of general intelligence led me in my teenage years not only to AI but also the philosophy of mind, which was quite confusing but also offered some clarity in some regards. In fact my own journey towards the OpenCog Hyperon design began more in philosophy of mind than in technical AI. 
”One of the philosophers who had a significant impact on me was Charles Sanders Peirce, an American philosopher from the late 1800s. He is known for introducing quantifier logic and contributing several technical elements that found their way into AI. Peirce’s MeTTaphysics evolved from three fundamental categories, which he called first, second, and third. The first is pure raw experience, which is unanalyzable. The second is reaction, such as one billiard ball hitting another, representing the physical world. The third is relationships, where one thing is relating to other things. 
”These categories can be interpreted in various ways. First could be connected to raw conscious experience, as discussed by David Chalmers in his analysis of consciousness. Peirce saw the relationship between raw phenomenal experience and complex semantic relationships not as a hard problem but as a category error. His perspective was that raw experience (first), patterns of organization (third), and physical reactions (second) are separate categories that should not be reduced to one another. 
"Peirce also had a notion of habits. He called it the law of the mind, which is the tendency to form habits. This meant that if a pattern had appeared in the world for a while, the probability of it appearing again would be higher than expected. The concept of patterns was fundamental to Peirce. 
”Taking inspiration from Peirce, I started to conceive intelligence systems and the mind as a collection of patterns, recognizing patterns in themselves and the world, habituating to each other and randomly mutating and combining with each other as they go. These patterns, in essence, make up the mind and are seen as self-organizing systems. Other philosophers like Gregory Bateson and linguists like Benjamin Whorf had similar perspectives, viewing the world as a self-organizing pattern system.” 
Theseideasfromphilosophyofmindandcomplexsystemssciencewerefleshedout inafairbitofdetailinaseriesofbooksGoertzelreleasedinthe1990s: The Structure of Intelligence [Goe93b], 
The Evolving Mind[Goe93a], 
Chaotic Logic [Goe94]and 
From Complexity to Creativity [Goe97]. 
These 
books 
also 
contained 
what 
could 
be 
consid­
ered high level sketches of AI designs – but nothing concrete enough to be directlyimplementedwithoutmakingalotofotherdifficultdecisionsalongtheway.
RatherthandetermininganAIdesign,thissortofphilosophical/cognitive-science/system-theoreticthinkingaboutAGIgivesawaytothinkaboutpotentialAGIdesignsorpartiallyorwhollyworkingAGIorproto-AGIsystems,andgivesguidanceastowhatsortsofAGIdesignsaremoreversuslesslikelytodeliverAGIatanadvancedlevel. 

2.3 APartialPrehistoryofHyperon 
Goertzel’s AGI-23 talk continued to explicitly recount how these conceptual investi­gations led to the creation of a series of practical AI software systems, culminating inHyperon: 
”In the early 1990s, I spent considerable time attempting to build systems based on self-organizing pattern recognition using early versions of Haskell. These attempts, while intriguing, did not lead to practical applications. I speculated if the issues were due to lack of scale or some fundamental problem with the approach. The human brain’s sheer size, with hundreds of billions of neurons, suggested that scale might be an essential factor. 
”I then discovered the potential of the internet for scaling these systems. Webmind, an initiative of the late 1990s, aimed at employing the internet to run self-organizing pattern recognition agents on a large scale. My book Creating Internet Intelligence summarized the notion of an emergent Global Brain, and in particular the idea that powerful AGI systems (like Webmind instances) living on decentralized compute networks could serve as the cognitive hub of a centralized global brain. 
”I also in 1995 posted a Web page announcing my future run for US President on a ’decentralizationist’ platform (I wouldn’t turn 35 till 2001, so I wasn’t old enough to run for President yet). Creating Internet Intelligence didn’t emphasize the political aspect but it was there in the background. Well before blockchain became a thing, I and others were thinking about the need for decentralized control of the distributed AI processes comprising a large-scale AGI, and the importance of this for keeping early-stage AGIs out of the hands of centralized entities with narrow goals. 
”My early speculative designs for globally distributed Webmind systems and associated Artificial Life systems call WebWorlds combined strong encryption and distributed processing in ways strongly reminiscent of modern ledger-free blockchains like TODA. (The notion of a huge replicated ledger of all transactions never occurred to me because of its obvious non-scalability). However, it didn’t occur to me to use decentralized money as an initial application for a global decentralized computing system – I did think about that briefly, but it just seemed to me it would take a long time to get such a system running fast enough to compete with Mastercard, Visa and such. Although I had done work on AI for financial trading systems, it didn’t occur to me that a decentralized currency could become the center of a partially-black-market speculative trading sub-economy. If it had, I would have been Satoshi and Hyperon would be a far better funded project! 
”In any case, the technological infrastructure of the time proved inadequate for creating practical AGI systems in the form of decentralized agent systems like Webmind. This led to the creation of the Novamente Cognition Engine, which was philosophically similar to Webmind but was organized software-wise in a configuration more akin to what Hyperon represents now. In Webmind, the focus was on a decentralized agent system, whereas Novamente was more structured. Both systems aimed at integrating logical reasoning, non-axiomatic reasoning systems, evolutionary program learning, attention allocation, and pattern mining. 
”Novamente centered on a knowledge base known as Atomspace, which was a structure originally called a ’generalized hypergraph’, a verbiage later tweaked to ’Metagraph.’ Basically: a graph with links that can span multiple nodes, and links that can points to links or larger subgraphs, and both nodes and links can be labeled with various more or less complex weights or structures (such as types that come from complex type systems and may be represented as Metagraphs themselves). Nodes and links in this framework are both referred to as Atoms. Webmind contained all this representational capability as well, but organized in a less clear and elegant way. 
”The Novamente team – led by myself, Cassio Pennachin, Andre’ Senna (who now plays a lead role in Hyperon), Pei Wang (whose NARS AGI initiative is still moving forward impressively) and others – implemented various cognitive processes as agents acting on this Atomspace. Essentially, we restructured the nesting order of two loops. In the original structure, the outer loop iterated through agents, each of which enacted different functions that collectively carried out cognitive processes. With Novamente, the looping sequence was reversed, as the system now looped through cognitive processes that acted on nodes and links within the Atomspace. 
”The efficiency of either approach was dependent on the hardware infrastructure in use: On an architecture like Danny Hills’s Connection Machine, a MIMD-parallel hardware device with up to 128000 fully independently programmable processors which I experimented with briefly in the mid-1990s, a Webmind-like design would be maximally appropriate and effective. On typical contemporary computing systems with their strict ’von Neumann architecture’ separation between RAM and processing, a design more like Novamente has more hope of achieving acceptable efficiency. On more innovative modern hardware designs like the processor-in-RAM AGI chip we’re working on with Simuli and TrueAGI, the optimal approach to implementing this general sort of AGI system may be somewhere between Webmind and Novamente, in a sense. 
”The Hyperon framework, unlike either the Webmind or Novamente systems, is designed to support a lot of flexibility in terms of how fully ’decentralized-agenty’ an implementation is – which is possible because of a lot of advances in computer science and software design over the last two decades. This ties in of course with the use of Hyperon’s MeTTa programming language (whose programs are subnetworks of Atomspace, designed to be interpreted as programs for transforming Atomspace) as a smart contract language in the Hypercycle ledgerless blockchain, which we’ll talk about a little later. 
”The Novamente AGI initiative was successful in producing research papers exploring different AGI algorithms and achieving some limited practical deployments, especially in natural language processing and signals analysis. In 2008, significant portions of the system were open-sourced as OpenCog, and a community of contributors began to build upon this codebase. One significant contribution was the OpenCog Pattern Matcher, developed by Linas Vepstas. Initially, the Pattern Matcher was a system for recognizing patterns in the Atomspace knowledge graph. Eventually, it evolved into a functional and logic programming framework with recursive pattern matching capabilities. 
”However, as OpenCog evolved, certain limitations were encountered, primarily related to scalability and ease of use. To address these challenges, some of the developers began experimenting with neurosymbolic systems. Alexey Potapov and Vitaly Bogdanov interfaced Torch, a deep learning library, with OpenCog, which allowed for combining symbolic and neural processes. However, this integration was found to be somewhat inefficient, as OpenCog was considerably slower than modern neural network frameworks, especially when running on GPUs. 
”Which is a meaningful part of what led us toward the AGI infrastructure design now referred to as OpenCog Hyperon.” 
The need for a more scalable and usable system than OpenCog circa 2020 led anumberofOpenCogdeveloperstoconsiderrebuildingthesystemalmostfromscratch.This was coupled with ongoing developments in mathematics and theory which thesedevelopers wanted to incorporate more directly into the AI system. One such conceptwas cognitive synergy, which stemmed from an understanding of how different typesof memory and learning mechanisms in the human brain interact. Cognitive synergy highlighted how the brain translates a problem from one kind of memory to anotherkindwhenitgetsstuck,essentiallyemployingdifferentkindsoflearningmechanisms.
To formalize this interaction between declarative, procedural, and sensory knowl­edge, category theory and other related mathematical concepts were used to map var­ious AI algorithms into operations over a metagraph. It began to seem feasible to in­corporate this mathematical framework more deeply into OpenCog to make it moreefficient. Thisconceptualandformaldirectionalsoseemedpromisingintermsofmak­ing more elegant and efficient interfaces between OpenCog systems and external AIsystemslikescalabledeeplearningframeworks.
Eventually, based on these needs and inspirations, a new system called OpenCogHyperonwasdeveloped. ’Hyperon’isthenameofanelementaryparticle;thenamewasbasicallychosentocontinuethephysicsmetaphorthemeoriginatedin’Atomspace’,and foritsresonancewith’hypergraph’(sinceAtomspaceisageneralizedhypergraphaka Metagraph).
Tonguepartlyincheek,itwasproposedthatthenexthugeoverhaulmightbecalledOpenCogTachyon, incorporated quantum computing constructsat thecore,or maybecomputational acceleration using novelhardwareincorporating closed timelikeloops!(Butwe’llleavethattoalaterdocument...) 


3 OpenCog Hyperon: A Modern, Scalable Infrastruc­ture for AGI 
NowletusfinallygointoalittledetailaboutHyperonasasoftwareframework!
Figure 
1 
gives 
a 
rough 
overall 
depiction 
of 
many 
of 
the 
key 
components, 
thoughtheinterrelationofthese componentsis highly diverse anddynamicand defies simpleaccuratediagrammatization. 
3.1 AtomspaceandMeTTa:TheCoreConstructsofOpenCog 
ThecoreconstructofHyperon,likethatofOpenCogandNovamenteCognitionEnginebefore it, is the Atomspace, a metagraph comprised of nodes and links with complexinterlinkagestructures. Thismetagraphishighlyversatileandallowsforlabelingnodesandlinkswithvariouskindsofdata,includingsubgraphs. Thislabelingmechanismcanalsofacilitatetheembeddingofcomplextypesystemsinthemetagraph.
AnewingredientofHyperon,qualitativelydifferentfromanythinginearlierOpenCogversions,istheprogramminglanguagecalledMeTTa. MeTTaprogramsaresub-metagraphs 

Figure 1: High-level illustration of key components in Hyperon architecture, including integra­tion into TrueAGI application framework. 
in Atomspace, and are interpretable as procedures for rewriting portions of Atom-space into modified or additional portions of Atomspace. (In atrivial way, every sub­metagraphinAtomspaceisasortofMeTTaprogram,inthesensethateveryAtomthat’snotinterpretableassomeinstructionbytheMeTTainterpreterisstilla”constant”items ofdataprocessablebyMeTTAprograms.)
The prior version of OpenCog, which in the Hyperon era has come to be called’OpenCogClassic’,featuredasophisticatedpatternmatcher(designedandimplementedby the heroic OpenCog developer Linas Vepstas) which had added into it a variety ofsophisticated functionsallowing it to domore than just match patterns in a traditionalsense, but also execute various transformations on the Atomspace while in the courseofdoingpatternmatching. Thisisareasonableandinterestingdesign,butinHyperonitwasdecidedtodothingsabitdifferently,andtoinstead: 
• 
Make the Hyperon pattern matcher more of a standard, static pattern matcher(though with plenty of special aspects, such as subtle handling of patterns in-volvingvariables,efficientexecutionofmatchinginvolvingAtomsbelongingtotypesystemswithefficienttypeinferenceassociatedwiththem,andmatchingofvariablesagainstwholesubgraphsratherthanindividualAtoms) 

• 
Insteadofembeddingcomplexprogrammaticlogicinthepatternmatcher,createa language MeTTa wrapped around the pattern matcher, which has invocationof pattern matching as a key functionality, but does programmatic logic outsideratherthanwithinthetraversalprocessofthepatternmatcher 


MeTTa then becomes a quite novel sort of programming language incorporatingaspects of both functional and logic programming, but going beyond either of thesestandardparadigms.
Alongsidepatternmatching,MeTTAalsoincludesequalitieswithadistinctseman­ticsthattooksubstantialconsiderationtodevelop. OneaimherewastointegrateMeTTawithhomotopytypetheoryamongothermathematicalmodelsthatprovidecomplexityto the concept of identity. MeTTa’s unorthodox approach to dealing with equality islow-level enough to not commit too much to how assignment or comparison have to operate.
Byitsbasicnature,theMeTTainterpreterenablestheAtomspacetoundergoameta­morphosisandinitiateself-rewriting. Thishasobviousimplicationsforself-modifyingcode. The Atomspace, when coupled with the MeTTa interpreter, can essentially beperceivedasself-modifyingandself-rewritingsetsofnodesandlinks.
Additionally,theMeTTalanguageisextremelyversatileandcanberepresentedasbothametagraphandaMeTTa-graph.
AsAlexeyPotapovrecounts,intheearlyphasesofHyperondesignitwasconsideredwhethertouseexistinggraphorvectorstoresandassociatedqueryenginesratherthanbuildourownnewAtomspaceandassociatedtools,butintheendtherequirementsforAGIwerejusttoodistinctive: 
"Representation of knowledge in Hyperon including MeTTA programs is metagraphs, which constitutes a substantial practical distinction from most other AI and AGI approaches out there. While ordinary graphs can be described as a collection of triples, and hypergraphs are collections of tuples, metagraphs are collections of trees, i.e., each edge is a tree-like connection of nodes or, alternatively, each edge is a tuple connecting any number of nodes and other edges. This representation is crucial for representing complex statements and arbitrary knowledge, and it is also convenient to represent program code. While metagraphs can be encoded in simpler data structures like ordinary graphs, their traversal, indexing and retrieval algorithms are not optimized for metagraph encodings. The latter requires introducing auxiliary nodes, which should be treated specially in indexing and traversal. While tweaking graph databases in such a way is possible in principle, benefits of the underlying graphical representation and corresponding algorithms are not obvious. 
"Moreover, the very core operation of MeTTa is pattern matching with unification of variables both in the query and knowledge base entries to be matched. This feature is supported in none of the query engines, and its implementation is achievable in a less cumbersome way for lower-level host representations like key-value storage. This is the reason for not using graphical storages as back-ends both for in-RAM Atomspace and Distributed Atomspace." 
Greg Meredith, in collaboration with the core MeTTa developers Alexey Potapovand Vitaly Bogdanov along with Adam Vandervorst, has put together a formal oper­ational 
semantics 
for 
MeTTa 
which 
can 
be 
found 
here[MGWV23]. 
There is also a FormalMeTTacoderepository 2 
whichsticksveryclosetotheoperationalsemantics,andhasbeenusedtoprototypeideasbeforeportingthemtothemainMeTTacodebase.
The relation between MeTTa and type systems, as used in computer science andformallogic,isworthofbriefmentionevenatthisoverviewlevel. MeTTaisextremelygeneral at its core. It does not possess types as it is fundamentally just rewrite ruleson the metagraph that are embedded within the metagraph. However, since types aremerely portions of the metagraph that are attached to selected nodes and links, typesystemscanbebuiltwithinit. Thisresultsinanextremelygeneralizedversionoftypesystemsthatcanhandledependenttypes,gradualtypes,higherordertypesrepresentingprobabilities,andsoforth. Thechallengeremainsinwritingefficienttypecheckersfortheseelaboratetypes,whichinvolvesintricatecomputerscience.
Asanillustrationoftheeleganceandgeneralityofthisprogrammingframework,attheAGI-22OpenCogworkshop,JonathanWarrelldemonstratedaveryconciseimple­mentation 
of 
Aczel’s 
non-well-founded 
set 
theory 
in 
MeTTa 
[WPVG22]. 
The 
sets 
inthistheorycancontainthemselvesaselementsorcanhavecyclicalcontainment. Thisimplementation made use of circular graphs to represent non-well-founded sets in theAtomspace, establishing rules to rewrite them. This allows among other things an el­egant implementation of probabilistic reasoning on infinite-order probabilities, whichGoertzelhasproposedasawaytohandleuncertainsharedsocialknowledge(”webothhaveintuitiveknowledgethatwebothknowthisstatementisprobablytrue” andother more useful variations like the shared understanding that characterizes every I-Thourelationshipandeveryrobustculture).
TherearecloseconnectionsbetweenStephenWolfram’sconceptoftheRuliad,pur­suedfrom atheoretical physics perspective, and MeTTa’sAtomspace. Bothare meta-graph structuresrepresentingpatternsamongpatternsamongpatterns ... (withoutany recursionlimit)... andbothcanbemodeledusinginfinitygroupoidsandinfinitycomma 
2https://github.com/Adam-Vandervorst/FormalMeTTa 

onecategories,amongotherrelatedmathematical constructs. ThespecificportionsoftheRuliadWolframhasbeeninterestedtoexploreinhisphysics-inspiredworkishow­ever different from thespecific sortsof metagraphsthatappear most useful inan AGIcontextinthenearterm. 
AsregardsthenameMeTTa, itisanacronymforMeta-Type-Talk,butasBenGo­ertzelnotedinhisAGI-23talk,”It’s also not escaped our notice that the term metta, in Buddhist philosophy, signifies loving-kindness. Impressionistically, the name could be interpreted as guiding the system towards a benevolent AI, both philosophically and in computer science terms.” 
3.1.1 TheNecessityofOneMoreProgrammingLanguage 
AsBenGoertzelnotedinhisAGI-23talk. "After some early attempts at creating novel AGI languages in the mid-1990s, I came to the conclusion that creating new languages was a temptation that the serious AGI researcher should probably resist. So often, it seemed, a researcher had the idea that if they just had a more apropos programming language their work implementing AGI would be easier 
– and then 30 years later they looked up and found most of their career had been spent on programming language R&D not AGI..... But yet, here I am several decades into my AGI research career, helping create a new programming language. A difference from some of the historical examples like LISP or Prolog, though, is that in the Hyperon team we are coming at our new language from the perspective of having quite a lot of specific stuff that we want to implement in the language. We already have built a bunch of specific prototype proto-AGI systems in other languages and frameworks, so we have a pretty good idea of what properties and aspects we need a language to have in order for it be maximally usable to realize our AGI ideas effectively."
AlexeyPotapovreiteratesthesepointsinmoredetail: "After long consideration of alternatives, we decided to embody knowledge representation, pattern matching queries, and their chaining in a dedicated language, MeTTa, which is the fundamental component of Hyperon. The need for a representation of knowledge is obvious, and introduction of a cognitive language is also very typical for cognitive architectures and similar platforms, but we did consider long and hard if it should be a separate programming language? Cognitive languages can be rather restricted or specialized and can be implemented as DSLs or libraries in some general-purpose programming language. 
"Since Hyperon is a platform for cross-paradigmatic studies, it was clear its cognitive language should not be too specialized. 
"Such languages as Agda, which serve as proof assistants, or more classical logical language like Prolog, as well as universal probabilistic programming languages such as Church or Anglican, are focused on one paradigm. For example, Prolog does have such extensions as ProbLog, but they are stand-alone projects, which are not interoperable. Similarly, when the need arises to analyze execution traces of probabilistic programs, one needs to hack into the language interpreter. Such languages do not natively work with knowledge bases, but can may only query external graph databases, implying that they do not have many features of cognitive architectures. 
"Implementing Hyperon as a library in some general-purpose host language also encounters some obstacles. As was mentioned above, such use cases for Hyperon exist, in which all knowledge entries including reasoning rules and procedural knowledge should be introspectable and rewritable. If we imagine Hyperon as a library in, say Python like PyTorch, we would like to write as much as possible in the Hyperon language, which programs are knowledge in the Atomspace, and as little as possible in Python. Code in Python is not introspectable knowledge, which can be reasoned over. Many examples of ad hoc symbolic systems implemented in traditional languages exist, but processing of symbolic information in such systems is written in imperative languages, which make them incompatible with each other and not usable by a larger symbolic system. Implementation of inference rules in the cognitive language itself is thus very important. This, however requires, such language to be quite general and rich. While it doesn’t mean that this cognitive language should be as general-purpose as Python or Rust implying that it should benefit a lot from interfacing with general-purpose language, this means that this cognitive language should be enough to implement various AI systems and components. Being put into Atomspace, these programs will not be represented as the code in some host language, and will be evaluated by their own interpreter. While it is still possible to avoid having one’s own syntax for this cognitive language and fill in Atomspace using constructions in some existing host language, abstracting the host language syntax away and separating pure cognitive language code have additional benefits. 
"Basically, Hyperon, similar to OpenCog Classic and many other cognitive architectures, has its internal cognitive language, which differs only in its universality and flexibility due to the design of Hyperon in general. Thus, it is not an option to not have any language at all. And whether it is treated as a programming language or ”just” an internal cognitive language without possibilities to write libraries in it, debugging, etc. is the matter of convenience. Apparently, if we want to implement different components like PLN, MOSES, ECAN, etc. for Hyperon in MeTTa as well as other libraries with custom inference strategies and different ways of integration with DNNs and such, then it is more convenient to treat MeTTa as a programming language." 
3.1.2 MeTTainaNutshell 
MeTTaisanovellanguageandgettingusedtoitrequireslettinggoofsometraditionalwaysofthinkingaboutprogramming, and acquisition of some new habits ... noquickoverviewisgoingtoprovideafullyeffectiveshortcutinthisregard. However,forread­ers who have sufficient technical background, it seems a brief summary of highlightsanddifferentiatingaspectsmaystillbeofsomevalue!3 

Programs in MeTTa are collections of expressions, which are placed into a con­tainer called Atomspace. Expressions are tuples of atoms, which can be either otherexpressions, or pure symbols, or grounded atoms, entities that wrap some (subsym­bolic,notfullydescribedbytheMeTTaprogramitself)data. Forexample,MySymbol , (A (B C D) E) and(’’point’’ (10 10)) arevalidexpressions,where’’point’’ and10 aresupposedtobeturnedintogroundedatomsbytheparser.
Atomspacesdifferfromothercontainersinthattheysupportspecialtypesofqueriesforretrievingexpressionsfromthem. WhileMeTTaexpressionscantreatedasedgesinthemetagraph,andthewholeAtomspacecanbetreatedasametagraphdata/knowledgebase with a querying engine efficiently operating over an indexed content, Atomspacequeries can be understood also as a generalization of pattern-matching in functionallanguages. Queries are expressions typically containing a special type of atoms, vari­ables (in the current syntax they are distinguished from ordinary symbols by placing $ at the beginning of their name). Expressions with variables can be referred to as patterns. For example, expression (A (B C D) A) can be retrieved by queries (or matchedagainstpatterns)(A $x A) or(A (B $x $y) A) or($x (B C D) $x),but notby (A ($x $y C) A) or(A (B C D) (A $x)) or($x ($x C D) A). 
ThedifferencebetweenAtomspacesandmanyotherdatabasecontainersisthattheycancontainexpressionswithvariables,andqueriesarematchedwithsuchexpressionsif variables both in queries and in expressions can be bound to some subexpressionsin a non-contradictory way. For example, (A ($a $a) A) can be matched against ($b (B B) $b),butcannotbematchedagainst($b (B B) C) or($b (B $b) $b). Inthelattercases,wecannotfindsuchasubstitutionforboth$a andb,whichwillmake thesetwoexpressionsidentical.
The core pattern matching function receives a query pattern and a result patternas its parameters. It searches for expressions in the specified Atomspace, which can 
3ThissectionwaswrittenbyAlexeyPotapov 
be unified with the query pattern, and outputs the result pattern substituting variablesin it with the values found during unification. For example, if the query pattern is (A (B $x $y) A) andtheresultingpatternis(Found $x $y),andthequerypattern ismatchedagainst (A (B C D) A),thentheresultwillbe(Found C D). 
Somegrounded atomscanwrapexecutablecodeinthehostlanguage. MeTTaex­pressions can be evaluated, and if an expression starts with an executable groundedatom,evaluationofthisexpressionwillresultinexecutionofthewrappedcode. match is a grounded atom, which refers to the implementation of pattern matching &self is agroundedatomwhichreferstotheAtomspaceinwhichtheMeTTaprogramitselfisstored. Evaluating 
(match &self $(A (B $x $y) A) (Found $x $y)) 
asanexpressioninMeTTawillresultinacalltothepatternmatchingovertheprogramAtomspacewiththecorrespondingqueryandresultpatterns.
WhenaMeTTascriptisprocessed,itsexpressionsareputintotheprogramAtom­space. If one wants to evaluate an expression immediately, currently, ! should be putbeforethisexpression. InthecourseofexecutionofthefollowingMeTTaprogram 
(Sam is a frog) (Tom is a cat) (Sophia is a robot) ! (match &self ($x is a robot) (I know $x the robot)) 
willputthefirstthreeexpressionsintheprogramAtomspace,andevaluationofthelastexpressionwillproduce(I know Sophia the robot). PatternsintheprogramAtomspaceareusefulforrepresentingsomegeneralknowl­edge. Thefollowingprogram 
(Implies (Human $x) (Mortal $x)) ! (match &self (Implies (Human Socrates) $y) (Concluding $y))) 
will output Concluding (Mortal Socrates)), because the query can be unified withtheAtomspaceexpression,when $x isreplacedwithSocrates,and $y isreplaced with (Mortal Socrates). 
Whileevaluationofgroundedoperationsisdelegatedtoexecutablecodewrappedbythem, evaluation of symbolic expressions is performed by the interpreter constructingequalityqueries. Thatis,if$(f a),isevaluated,query(match &self (= (f a) \$r) \$r) is constructed, and the result of this query is evaluated further. If the result of some equality query is empty, the expressionisevaluatedtoitself (notreduced). Let?scon­siderthefollowingprogram: 
(= (add (S $x) $y) (Add $x (S $y))) (= (add Z $x) $x) ! (add (S Z) (S Z)) 
Evaluationof(add (S Z) (S Z)) willstartwiththequerypattern (= (add (S Z) (S Z)) $r). ItcanbeunifiedwiththefirstexpressionintheAtomspacewithbindings: $x<-Z, $y<-(S Z), and $r<-(add Z (S (S Z))). $r is interpreted further by constructing the query pattern (= (add Z (S (S Z))) $r). It will be unified with (= (add Z $x) $x) yielding (S (S Z))) as the result. Attempting to query (= (S (S Z)) $r) further willgiveanemptyresult(no match),and(S (S Z))) willbeevaluatedtoitself(the finalresult).
It can be seen that evaluation of MeTTa expressions via equality query chainingworks as functional programming. But one should note that these equalities are stillentries in the knowledge base, which can be explicitly queried. For example, one can executequery 
(match &self (= (add $x $y) Z) (Answer $x $y)) 
for the last program andget (Answer Z Z), because the query pattern can be unified only with (= (add Z $x) $x) (note that variables with the same names in the twopatternstobematchedaretreatedasdifferentvariables).
Queries with variables are similar to database queries. Program expressions withvariables are similar to functional programming. Variables on both sides enable fea­turessimilartologicprogramming(unitedwithfunctionalprogrammingandknowledgebasesinaunifiedway). Considerthefollowingexample(True and and aredefinedin thestandardlibrary): 
(= (croaks Fritz) True) (= (eat_flies Fritz) True) (= (frog $x) 
(and (croaks $x) (eat_flies $x))) (= (green $x) (frog $x)) ! (green Fritz) 
The last expression will be evaluated to True in a functional way. At the same time, (green Sam) willnotreturnFalse,butitwillbereducedto(and (croaks Sam) (eat_flies Sam)). More interestingly, (if (green $x) $x (no-answer)) can also be evaluated pro­ducingFritz. ThereasonisthatMeTTacanevaluateexpressionswithvariables,becauseitsimplyconstructsequalityqueries,e.g. green $x) isevaluatedviathequerypattern (= (green $x) $result), $result will be (frog $x), which will be evaluated furtherto(and (croaks $x) (eat_flies $x)). Querypattern(= (croaks $x) $result) will be matched against (= (croaks Fritz) True), with $result bound to True and$x toFritz. 
With the use of match, programmers can define rules for inference over purelydeclarativeknowledgeinMeTTaiftheywanttoavoidautomaticequality-basedchain­ing. For example, the program (, in the query pattern means that two subpatternsshould be matched simultaneously with possibly different expressions, but with samevariablebindings) 
(Fact (Human Plato)) (Implies (Human $x) (Mortal $x)) ! (match &self (, (Implies $a $b) (Fact $a)) (Inferred $b)) will output (Inferred (Mortal Plato)). 
MeTTahasanumberofspecificfeatures: 
• Non-determinism. Queries can return multiple results, and thus equality-basedevaluationscanreturnmultipleresultsaswell. (match &self (is-a $x Human) $x) willreturnbothPlato and Socrates if 
&self contains (is-a Plato Human) and (is-a Socrates Human) 
• Gradual dependent types. Symbols can be typed, and types of expressions willbeautomaticallyinferred(viapatternmatchingaswell),e.g.,for 
(: Nat Type) (: Z Nat) (: S (-> Nat Nat)) (: Vec (-> $t Nat Type)) (: Cons (-> $t (Vec $t $x) (Vec $t (S $x)))) (: Nil (Vec $t Z)) 
thetypeof (Cons 0 (Cons 1 Nil)) willbe (Vec Number (S (S Z))). 
• 
Customgroundedatoms.MeTTaprogramscanbeextendedbygroundedatomswrapping custom external data structures or code provided in another language(Rust, C++, Python). This is an important feature for grounded reasoning andneural-symbolicintegration. 

• 
Self-modification.Besidesmatch,AtomspaceAPIincludesfunctionsforaddingand removing atoms, which themselves are represented as grounded atoms inMeTTa,sotheprograminMeTTacancompletelyrewriteitsowncode. 


3.1.3 OptimizingtheMeTTaInterpreterforAGI 
MeTTa as a language could be used for a variety of applications beyond AGI – there are many different domains where having a language flexibly capable of both logicalandfunctionalprogramming,andabletohostavarietyofdifferenttype-systemsinclud­ing those created at run-time, would simplify otherwise complex programming tasks.However,our. maingoalwithMeTTaispreciselyAGI,andsowehaveputsignificantanalysis into how to optimize the MeTTa interpreter for effective performance on thearrayofAGIalgorithmsweconsiderlikelytobemostcritical.
AsBenGoertzelnotes, 
"In 2020 I found myself with more time for theoretical work than in the years immediately previous, due to the COVID-19 pandemic massively slowing down my business travel schedule. So I revisited some mathematical AGI theory that I’d set aside some years before, and did some work convincing myself that basically all the algorithms needed for AGI according to my OpenCog approach could be represented, within a decent degree of approximation, via fancy versions of operations called folding and unfolding, enacted over metagraphs. 
"In particular, there are operations in functional programming theory called futumorphism, histomorphism, metamorphism and so forth – the so-called ’morphism zoo’ – which are usually implemented over lists or trees, but it seemed to me that by implementing these ’recursion schemes’ over metagraphs one would have an infrastructure for efficiently implementing logical reasoning, evolutionary learning, attention allocation, and so forth ... all the core techniques I felt were critical for implementing human-like mind. 
"The implication here is, then, if one can make these folding and unfolding operations on metagraphs efficient in the MeTTa interpreter, this will go a long way toward making AGI algorithms efficient in the Hyperon system. I.e. there is value in doing some math to reveal more of the common structures and operations underlying what appear to be quite diverse AGI oriented algorithms. And while this math is not incredibly abstract or difficult compared to the toughest modern mathematics, it’s also stuff that basically couldn’t have been done 20 years ago, because not enough of the math of functional programming had been developed at that point. 
"A disadvantage of this sort of approach is that it’s a bit too abstract for the typical computer programmer to deal with, let along say an application developer or a cognitive scientist. But of course few users of a computer or a phone need to understand the underlying semiconductor physics either. This becomes a challenge in system design – creating domain-specific languages, APIs and other simplified tools that enable usage of sophisticated underlying mechanisms without needing understanding of all the details. " 
3.1.4 SomeChallengesfortheNextPhaseofMeTTaDevelopment 
MeTTaisaquitedifferentsortofprogramminglanguagefromanythingelseoutthere,anditsclosestrelativesarerelativelyobscurelanguagesknownonlytohardcorefunc­tionalprogrammingaficionados. Forthosewhoreallywanttounderstandhowitworksinpractice,someofthewalk-throughvideosgivenbyAlexeyPotapovwouldbeagoodplacetostart[Pot22][PB22],alongwithAlexey’sbasicconceptualdocumentationwrit­ten 
at 
the 
start 
of 
the 
MeTTA 
project 
[Pot21]. 
For 
those 
with 
a 
more 
strongly mathe­matical bent, GregMeredith’s write-up of the MeTTa operational semantics will shedsomeclarity[MGWV23].
WhilealothasbeendonetogetMeTTatothepointwhereitisnow –andthelan­guage is already being used for some experimentation with AGI-oriented algorithms 
– there is a lot of work needed to progress MeTTa to the point it needs to be in orderto serve effectively as the underlying language for development of and reflective self-programming of a human-level (and beyond) AGI. Readers who have gone throughsome of the above in-depth materials on MeTTa may be interested in Adam Vander­vorst’scommentsonsomeofthechallengesfacedinthenextphaseofMeTTadevelop­ment. Adam’sFormalMettacodebaseisalsointerestingtolookat,andhasbeenveryuseful as a sort of intermediary between the purely mathematical view of MeTTa andtheprimaryRustcodebasethathasbeenthefocusofproto-AGIexperimentation.
Adam summarizes some of his thoughts on the present and future of MeTTa asfollows: 
At the core of the Hyperon ecosystem lies the Atomspace, the spiritual successor of the OpenCog Atomspace, built from the ground up to support the new MeTTa language (in turn the successor to the Atomese language). Both are radically simplified: no first-class lambda expressions or quotes, and a type system that lives at the same level as the terms. Manual query building has been replaced with a uniform (nested) unification syntax, and adding custom adding functionality has been fully embraced. The simplifications allow for many of the advancements in this document, and we’ll now discuss some of the challenges they bring. 
Simpletermlanguage : MeTTa’s bare-bones term language provides great power and flexibility but to make it really usable by a wider developer group there will need to be a lot more documentation and tooling. 
MeTTa has just four types at its core: symbols (names), variables (placeholders), grounded symbols (custom functionality), and expressions (lists of these core types). This means data structures like Algebraic Data Types have to be declared and used in the same way as any other construct. The same is true for functions, which have to be broken up in scopes where variables can be unified, and then noted down as any old expression with variables. Let’s take a look at this more concretely: 
(= (succ \$x) (S \$x)) 
That doesn’t look too bad of a definition! None of these symbols are grounded, we have one variable in $x and the rest are symbols. However, some renaming gets us here: 
(If (Has $money) (make $money)) 
which loses all intent of the original statement. Generality cuts both ways, and not having a ?new? keyword for instantiating classes or a ”def” keyword for defining function causes the language to be extremely flexible. Even more so considering renaming statements (equalities of their own) can be added at runtime. 
Not all hope is lost at creating a friendly and safe language, though. Recently, languages have been separating naming from functional definitions. Unison is one such language which stores code in a database, and keeps separate files naming the normalized code fragments. Let’s take a look at Lamdu 4: they embrace the naming flexibility to provide an unseen level of internationalization. The interactive nature of their editor allows users to see what names are bound to by virtue of virtual inlining, live evaluation, and showing aliases on hover. Tooling will be paramount in the success of a low level, express, and dynamic language like MeTTa. 
Note how in our example, we broke expectation by: 
4https://www.lamdu.org/ 

• 
Aliasing the symbol ‘=‘ which plugs in directly into the interpreter via match and evaluation. 

• 
Aliasing the function ‘succ‘ by a property or destructor looking ‘Has‘. 

• 
Aliasing the constructor ‘S‘ by a function looking ‘make‘. 


In an editor functions can be rendered as such regardless of the symbol indicating it plugs into evaluation. Newly defined names can be highlighted like is conventional in programming. References can be resolved by the editor, to indicate whether a symbol has a definition in the space or not. 
All these solutions make use of the dynamic database nature that brought about the challenges in the first place. This puts extra burden on the library and editor authors: define in MeTTa itself what symbols in MeTTa statements mean, so it can be queried by the user (their tools): quite a meta solution. 
Extensible type system The base MeTTa language is untyped, though complex type systems can be created on top of this core, which is anticipated to be a major usage mode of the language. The untyped feel of the base language has its pros and cons. 
The unification and transformation MeTTa supports is enough to implement type checking, inference, and elaboration. However, because MeTTa programs are long lived and built over time rather than space, ideally you’re engaging in a conversation with type checker, rather than committing your entire program at once and getting a report of type errors back. Together with types being just terms, e.g. 
(: succ (-> Nat Nat)) 
You’re optionally narrowing down the valid terms as you’re building the program. On the positive side, this allows you to experiment, either defining the type or the term first. Potentially, with an editor, even allowing you to insert the type guessed by the typer in the code base. On the flip side, you have to keep the level of completion of your program in your mental model. That is, the interactive process won’t complain about missing definitions, and will instead execute to where it can. So you and your tooling are responsible for planning and marking the todo’s of your program, not unlike proof systems where you have ??? indicating holes and the type elaborator helping you fill them. 
Simpleexpressivereductionsemantics For computer scientists, functional programmers or AI developers accustomed to languages varying on the lambda calculus formalism, the lack of explicit lambda-like mechanisms in MeTTa may seem counterintuitive. 
Instead of the classical beta reduction ’variable substitution’, MeTTa uses unification. This two-sided substitution mechanism, also seen in the new Verse programming language (and its calculus) 5 
, allows information to flow two ways: not only can the results be computed from the arguments, the arguments can also be computed from the results, and any combination of those. This is quite alien for folks coming from almost any other paradigm than functional logic programming, but it allows (locally) declarative statements you mathematically expect to work to be used in programming. 
Unification is a heavy hammer, though. In many contexts you don’t need it, and you have to reason about the potential meaning for longer because the possibility of ’odd things’ happening is always present in MeTTa. This can be tackled in a similar fashion to renaming (supra) and grounding (infra) where extra information, preferably statements in MeTTa, can indicate the control flow to the user and optimizer. 
Transformingspaceswithmatch As alluded above, MeTTa has a unified construct for all your querying needs. The ’match’ construct is used to handle anything from the most benign lookup – e.g. 
sensors[temperature][outside]): (match &sensors (Temperature Outside $t) $t) 
– to two-step transformations (classically an orchestration of joins and meets on different fields chained into insertions) such as 
(match &process (send $channel, $payload) (match &process (recv $payload $channel \$body) (Result \$body))) 
Note that without an extra (JIT) compilation step a database query is executed on every result of the first database query. 
This sort of optimization problem (that also applies to functions on multivalued inputs) has been tackled by many groups before, though unification adds an extra layer of complexity. 
Customfunctions The potential to use ’grounded Atoms’ to refer to functions implemented in other programming languages outside the Atomspace is critical and valuable, and can be used quite flexibly, but also presents the developer with complex choices. 
The questions ’Is this grounded? Should this be grounded?’ don’t always have obvious or single answers. 
5https://github.com/UnrealVerseGuru/VerseProgrammingLanguage 

From basic functionality like floating point numbers to whole PyTorch models, everything outside of the four core types is added via grounding. Grounding can change the value, pattern matching behavior, and evaluation. Since it’s outside of MeTTa, and the grounded definition is not queryable like a normal definition, the library author has the responsibility to add an elaborate description. For example, if the definition is in MeTTa, we can do a query to find out the number of arguments a function takes, but if it’s a grounded function, we need to either add this information to a meta-space or use a stub. 
A more complicated matter is dependence. A ‘match‘ (and evaluation in general) takes into account specific symbols. For example, ‘=‘ is not a grounded symbol, but it is relied on in a grounded function. If ‘match‘ was implemented in MeTTa, we could write a function that analyzes the definition and informs us about aliasing ‘=‘ (or writing a grounding for it ourselves). For example, a developer relied on the symbol ‘,‘ to mean pair, but at some point the grounding of ‘match‘ was changed to give special meaning to this symbol (using it to indicate a composite query), which broke the developer’s code. 
There are several potential solutions, from namespaces, to code sanitizers and interpreter warnings. Coming up with a holistic solution will require significant effort, and is needed to scale MeTTa to serve large codebases and long dependency chains. 

3.2 Hyperon’s Position in the Era of LLMs 
Asonecanseefromthelastfewsectionsofthisdocument,MeTTaandotheraspectsofHyperonhavetheirownconsiderabletechnicaldepth,callingonavarietyofacademicandpracticalknowledgebasesandtraditionswiththeirownlonghistories. Ontheotherhand,today’sAIsceneissomewhatheavilydominatedbyLLMs,whichinsomewaysare coming from a quite different direction than all this deep subtle complex MeTTa­ness–makingitnaturaltoreflectadcommentabitonhowHyperonfitsintotheLLMlandscape. "GoingbeyondtheshortcomingsofLLMs"istotallynothowHyperonwasoriginated and certainly not the most natural way to think about Hyperon, but it’s ameaningfulangleto takethought-experimentally, especially inthecontextofbuildingpracticalsystemsintegratingLLMswithHyperoninvariousways.
LLMshaveaninterestingpositioninginthecontextofgeneralintelligence. LLMscanbeconsiderednarrowAIinaprincipledsense,yettheypossessanincrediblybroadscopeinahumansense. Theyoperatebyutilizingvastamountsoftrainingdataandex­hibit limited generalization beyond that. The fact that LLMs don’t venture far beyondtheir training data distinguishes them from powerful AGI, which inherently involves generalizing beyond initial programming and training data. However, LLMs, by gen­eralizing just slightly beyond their extensive training data, can perform a very broadrangeoftasks, becausetheirtraining datacoverssomuch ofwhat interestshumansintheireverydaypursuits.
ItisalsonotableandfascinatingthatLLMsdisplaysomeformsofemergence. Forexample,theydemonstratefew-shotandin-contextlearningbyadaptingtonewexam­pleswithoutmodifyingtheweightsofthenetwork,purelybydynamicsintheirneuralactivation space. While the concept of learning in a neural network without weightmodificationisnotnew,thescaleatwhichLLMsareabletoapplythistypeoflearningisunprecedented.
However, there are some quite serious limitations to LLMs. For instance, system­aticmulti-stepreasoning,asrequiredinscientificresearchorproducinggroundbreakingmathematical theorems, is challenging for these systems. This is partly because theypredominantly recycle existing knowledge rather than extending far beyond it. Addi­tionally, LLMs struggle with creativity, often producing work that is derivative ratherthan is aesthetically rich or moving let alone artistically groundbreaking. In the end,it’s clear the major limitations of LLMs are closely related to their narrowness, theirtraining-data-boundcharacteristics.
AmongtheoverallAIresearchcommunity,opinionsvarywidelyregardingthere­lationship between LLMs and AGI. Gary Marcus and Yann LeCun for instance viewLLMs as a diversion from the path to AGI, while others think of them as significantprogress,believingthatscalingupandaugmentingcurrentLLMs,orcombiningLLMswithothertechnologies,couldbeaviablepathtohuman-levelAGI.
Asshouldalreadybeclearandwillbemadeevenclearerasthisdocumentunfolds,LLMs are far from the core of the Hyperon system or its associated theory. However, ourcurrentworkinghypothesisisthatLLMsmaybetightlyorlooselyintegratedwithHyperonsystemsandinthiswaycouldcometoplayasignificantroleinHyperon-basedgeneralintelligence.
There are also more general lessons to be drawn from LLMs for the developmentofHyperonandothernon-LLM-centeredAGIapproaches. Forinstance,onekeypointdriven home by large language models (LLMs) is that – surprise, surprise! – mas­sivescalingcansometimesdramaticallyenhancethecapabilitiesofanAIsystem. Hy­peron,likemoderndeepneuralnetframeworksbutwithsubtlerparticulars,isbuiltwithscalability in mind. It leverages modern hardware, distributed processing, and evenblockchains to achieve this. The impressive scalable performance of LLMs providesa valuable pressure to leverage modern computing and data infrastructure technologyto bring other AI algorithms to a similar level of scalability, sothey can start to fulfill 
theirhistoricalpromiseasLLMshavealloweddeepneuralnetstodo,andsotheycaneffectivelyhybridizewithLLMstoyieldemergentformsofintelligence.Diggingalittledeeper,AlexeyPotapovsummarizessomeofthereasonsforpursu­ingHyperonasanalternativeoraugmentationtoLLMsasfollows: 
"Limitations of LLMs are now becoming generally clear, alongside their impressive strengths. Short-term results can be achieved by integrating symbolic knowledge and reasoning with the existing pre-trained LLMs. However, integrating the existing LLMs (especially via prompts) even with an advanced knowledge graph and a symbolic reasoning system is arguably not enough for achieving human-level AGI. 
"The focus in AGI R&D can be different. Improvement of LLMs with symbolic components in the context of Hyperon development may include augmenting LLMs with external rewritable memory based on metagraph querying. Alternatively, DNNs, even such large as LLMs, can be considered as specialized modules (a sort of reflexes, instincts, or skills ? general narrow AI rather than AGI or even narrow AGI by themselves), which are controlled by explicit knowledge and by reasoning-based engines integrated with other approaches and techniques. Using Hyperon makes great sense within the latter approach, though there are also sizable challenges. 
"Any scenario of AGI development will arguably include achieving capabilities of dealing with real-world situations, which are richer than natural language descriptions. The Hyperon-based approach supposes learning explicit representations of such situations, which should be not as brittle as the contemporary symbolic representations and much more structured that implicit representations learned by neural networks. Thus, two main challenges for Hyperon are: 
• 
Scaling knowledge metagraphs, at least, to the amount of information digested by LLMs; 

• 
Mitigating the brittleness sometimes found in symbolic AI methods, which sometimes comes together with their dependence on hand-crafted representations, rules and algorithms. 


"Overcoming both challenges might be possible within different approaches and, in particular, with different roles for DNNs/LLMs and different types of neural-symbolic integration; choosing the best approach is a challenge by itself." 

3.3 Specialized Spaces with Diverse Roles 
ReturningnowtoourexplicationofthetechnicalgutsoftheHyperonapproachtoAGI –Theprimarymeta-representationalhubofHyperonistheAtomspacemetagraph,but thereisalsoabroaderSpaceAPIthatpermitsthecreationofmultiplespecializedtypesofSpaceswithinit,complementingthestandardin-RAMAtomspace. TheseadditionalSpaces can serve various functions, such as distributed pattern storage and look-up,efficientconcurrentexecution,andintegratingneuralnetworksinamannerthatmakesthemappearasAtoms.
ThevarietyofSpacesispartofwhatallowsHyperonandMeTTatoservenotonlyastheoreticalframeworkandresearchtoolbutalsoasaninfrastructureforpracticalreal­worldapplications. Itsflexibilityallowsittoservevariouspurposesrangingfromcreat­ingself-modifyingcodesoupstoservingasasmartcontractlanguageinablockchain.With advancements in computer hardware, such as increased RAM and faster proces­sors, the viability of using MeTTa for a plethora of applications becomes even morefeasible. 
For example, there is a distributed Atomspace (DAS) that can run across multiplemachines. This variant of the Atomspace backends on MongoDB and Redis, usingmodern NoSQL database technology to have a large distributed Atomspace spanningacrossmultiplemachines.
ThereisalsoaRholangAtomspace,whichcontainsMeTTaprogramscompiledtoRholang,alanguageknownforrunningvariousprogramsefficientlyonconcurrentpro­cessinginfrastructures,suchasmulticoremachines,andcoreswithbuilt-inmultithread­ing capability (and experiments are currently being run with Rholang on the cutting-edge APU Associative-Processing-Unity chip by GSI) . By creating what is termed a"RholangAtomspace,"onecancompileMeTTa-programsintoRholang,whichisthenexecuted efficiently on a concurrent processing infrastructure. This brings with it theadvantagesofefficientconcurrentprocessingandintegrationwithblockchaintechnolo­giesandencryption,amongotherfeatures.
Another key functionality elegantly enabled via the option for multiple types ofSpaces is the capability of interfacing with neural networks through the AtomspaceAPI.Thismeansthatyoucouldwrapalargelanguagemodelorotherdeepneuralnet­worksinanAtomspaceAPI,andperformpatternmatchingagainstthem. Thiscreatesabridgewherethereisatranslationbetweenformal pattern-matchingqueriesand, forinstance,naturallanguagequeriesoractivationsinaneuralnetwork. Thisresultsinthe formation of what can be referred to as a neural Atomspace, which serves as a neurallobe within the overall Hyperon system. A single Hyperon instance could potentiallycontain multiple neural lobes implementing different neural architectures oriented to­ward different purposes; the neural lobes could interconnect directly and/or use otherspacessuchasthedefaultAtomspaceasahub.
There is also an initiative aimed at working with specialized custom hardware to 

Figure 2: High level architecture of Hyperon Distributed Atomspace 
improve efficiency and scalability: the (currently in the early stages of development)OpenCogpattern-matchingchip. InacollaborationbetweenSimuliandTrueAGI,thischip is being designed to contain an on-chip Atomspace that supports Hyperon-stylepatternmatching,albeitwithpotentialrestrictionsontheAPIbasedonhardwarecon­straints. 
3.3.1 TheDistributedAtomspace 
AndreLuizdeSenna,oneoftheleaddevelopersoftheWebmindCognitionEngineandNovamenteCognitionEnginethatprecededOpenCog,andoftheoriginalversionoftheOpenCogAtomspace,hasmorerecentlyledthedesignanddevelopmentofHyperon’sDistributed 
Atomspace 
(as 
loosely 
depicted 
in 
Figure 
2. 
He 
summarizes 
his 
work 
onthisasfollows: 
"Distributed Atomspace (DAS) is the hypergraph used by OpenCog Hyperon to represent and store knowledge. The nature and the amount of knowledge that needs to be stored vary a lot depending on the domain and the AI algorithms being used to address the problem but the way the AI agents interact with DAS is always by using it as the source of knowledge and the container of any computational result that might be created or achieved during their execution. 
"As a data structure, DAS plays a central role in every AI agent. Operations like hypergraph traversing, querying for node’s or link’s properties, subgraph matching, etc are performed all the time during the execution of any AI agent, and also requests for addition of new elements and changes in properties or in connectivity of nodes, links and subgraphs as the agents achieve intermediate or final results. Therefore, DAS must have a very flexible API with efficient CRUD operations for hypergraph elements and a robust indexing system to allow efficient execution of complex queries involving properties, connectivity, subgraph topology, etc. 
"Keeping such a flexible and responsive API is a great challenge when the size of the knowledge base is very large, demanding a persistence back-end. Using a scalable database engine sounds like a straightforward approach to achieve these goals but there are issues that need to be addressed in order to make them suitable to represent and store knowledge bases in the way DAS requires. 
"The choice of which database engine to use is the first one. This is an issue because some aspects of the Atomspace are better represented in some types of databases while other aspects are better represented in others. This is also true for the indexes we need for the queries. Each database engine offers specialized index types which would be very useful like hash tables, text indexes with support to regular expressions, geospatial index, b-trees, schema index, etc but no database engine offers all of them. 
"In addition to this, AI agents need to drive their attention to the most relevant portion of the knowledge base at a given moment, focusing on some portions of the hypergraph while disregarding others. Therefore, DAS needs a sort of cache hierarchy capable of keeping the most relevant information closer to the agents (local RAM) while the information which is not being actively used at the moment may be away (remotely or in disk). This is an issue because the principle of locality applied to Atomspace knowledge bases don’t follow any of the typical types (temporal, spatial etc) intrinsically assumed by database engines to implement caching and load balance policies, therefore these policies tend to underperform badly in OpenCog Hyperon. 
"To address the first issue, DAS uses multiple database engines in the persistence back-end with a layer to abstract their APIs and to route requests to the more suitable engine according to the available indexes, as illustrated in Figure X. Some aspects of the knowledge base, (e.g. nodes and links properties) are modeled in a document DB while other aspects (e.g. hypergraph topology) are modeled in a key-value DB. We use MongoDB and Redis in our PoC implementation but there could be other DB engines as well. 
"Requests to the persistence layer are routed to one or more DB engines. For instance, requests for the links in the incoming set of a given node (i.e. links that point to a given node) are redirected to Redis while requests for nodes whose name matches a given regular expression are redirected to MongoDB. The choice is made in the Atom DB based on the available indexes in each DB engine. 
"DAS has a local cache running in the MeTTa interpreter. It’s an Atomspace with API to create, modify and query for atoms either by traversing the hypergraph or by subgraph pattern matching. This Atomspace is integrated with the interpreter in a way that the calls to this API are transparent to the MeTTa programmer. Caching policy is defined at runtime using subgraph patterns to determine how atoms move from the local cache to the main DAS server and the other way around. 
"There’s a Proof-of-Concept implementation of DAS (as shown in Figure X), developed as an isolated component and deployed in a cluster of 5 servers (3 for Redis, 1 for MongoDB, and 1 for DAS) tested with a knowledge base of 300M atoms running simple AI algorithms locally. The response time for typical queries was encouraging so now we’re aiming at turning it into a real Hyperon component integrated in the MeTTa interpreter. Basically, the plan is: 
• 
Implement the local cache which will run inside the MeTTa interpreter, with dynamic cache policy rules based on relevant subgraph patterns. 

• 
Implement a scalable deployment architecture capable of auto-scaling to fit knowledge base size as well as query load. 

• 
Tune Atom DB and the DB engines in order to make the most of all the indexes and clustering features offered by each engine 

• 
Extend DAS Query Engine to support all query types required by Hyperon AI agents 



3.4 DecentralizedDeploymentviaBlockchainIntegration 
Throughappropriateblockchainintegration,adistributedHyperoninstancecanbespreadacross many machines worldwide, without need for any single owner or central con­troller. One can have coordination among many agents running on different machineswithoutrequiringcompletetrustbetweenthepartiesinvolved.
The use of blockchain infrastructure has a variety of advantages. It opens up ahost of compute resources for usage by distributed Hyperon systems, including spareresources on home computers and phones and dedicated home compute boxes, andserverfarmshistoricallyusedforcryptomining. Italsoleadsnaturallytoinfrastructurethatissecurebydesign,andrespectsthesovereigntyoftheindividualsandentitieswhohave provided data to train and teach early-stage AI systems. It encourages the use ofcreative tokenomic models to incentivize provision of hardware, data and educationalinteractiontothesesystem.
BenGoertzelobservesthat,”As progress advances further toward human-level AGI, the use of decentralized infrastructure also decreases the odds of any single party achieving autocratic power over powerful AGI systems. A core intuition here is that decentralized, participant-governed systems like the Internet and the Linux operating system provide a better model for the coordination and operation of powerful AGI than centralized IT systems such as those currently offered by e.g. US and Chinese Big Tech companies.” 
KeydecentralizedtoolscurrentlyplannedfordeepintegrationintoHyperonarchi­tectureinclude: 
• 
SingularityNETprotocolforcoordinationamongdecentralizedAIagents 

• 
NuNetprotocolfordecentralizedcoordinationofcomputeresourceusageamongAIagentpopulations 

• 
Hypercycleledgerless-blockchainprotocolforsecurescalabledecentralizedcom­municationamongdistributedsoftwareprocesses 

• 
The Rholang language’s capability for efficiently executing software programs(”smartcontracts”)acrossdecentralizednetworks 


Hyperon itself can operate perfectly well without any of these. However, it wouldneedtobedeployedinatraditionalwayoncentralizedserverfarms,withsecuritypro­videdviafirewallsandtraditionalmechanisms,andwithdifficultiesoperatingintegratedcognitivenetworkswithdifferentportionsownedbydifferentindividualsorentities.
Rholang has a special role here in that it has two uses for Hyperon: to enable se­curedecentralizedexecutionofMeTTascripts,andalsotoenableefficientexecutionofMeTTascriptsonconcurrentprocessinginfrastructure.
SingularityNET’s Chief ProductOfficerJan Horlings summarizesthe value addedbythesevarioustoolsasfollows: 
” At its core, the SingularityNET platform is a distribution channel for AI services that allows any developer of any sort of AI method to monetize API calls, in a trustless setting. Once published, any user can independently start making API calls and the publisher/developer will receive AGIX based on successful calls made, without additional overhead. On the platform, Hyperon will be a very sophisticated and general AI service among many smaller, more dedicated AI services and Knowledge Graphs. 
"Hyperon will be offered on the platform with a number of AI strategies and functionalities deeply integrated, such as LLM, ECAN, PLN and SISTER. There will however be opportunities to integrate a wider variety of services into the Hyperon Framework. The decentralized platform offers this opportunity to every developer or organization that would like to take part in extending the capabilities of Hyperon. (Or, framed differently, extend their own service by integration with Hyperon) 
"A crucial enabler of the platform dynamic between services and Hyperon is what we call ”AI-DSL” or AI Domain Specific Language. We are developing this sophisticated intelligent orchestrator of services that will recognize the inputs, outputs, and purpose of each service, as well as other attributes, such as a multifaceted ?reputation’ score. It will be able to create ad-hoc workflows based on available services and user requests. LLM-based enhancements of AI-DSL will enable AI users to give the platform instructions in natural language; the Platform Assistant. It will figure out what the ?best’ available services are (fastest, cheapest, highest quality, etc,) depending on the use case and the user’s specific needs) and the best sequence to reach the desired result. 
"In other words, once we have a sufficiently mature version of Hyperon running on the platform, the Platform Assistant (AI-DSL) will function as a User Interface to Hyperon and other dedicated services on the platform. Of course, this is not the only way to run dedicated services or Hyperon on the platform. All kinds of tools and applications can interface with hyperon or a specific service directly or can rely on an API-based version of AI-DSL to continuously monitor the platform AI-service ecosystem and come up with the best sequence at a given time. 
"This way the platform firmly embeds Hyperon in an open and fully decentralized ecosystem of -potentially very diverse-Knowledge Graphs and AI services, enabling the global community of developers to contribute and enhance its core capabilities and similarly, enabling anyone to connect and benefit from its growing potential. 
ThebasicstrategyforintegratingHyperonwiththesedecentralization-orientedtoolsis relatively simple. Each DAS component, and each local Atomspace (with coupledMeTTa interpreter), can be treated as a SingularityNET agent, wrapped in a Hyper-cycle AI Machine container, which is associated with a NuNet node that manages itsdeployment and orchestration. The MeTTa scripts running in one of these Hyperonagents,whentheyneedtointeractwithotheragentsinthenetwork,willbecompiledtoRholanganduseRholang’sintegrationwithHyperCycletocarryoutsecuremessagingwithotheragents.
Implementationofallthis,ofcourse,involvesmanynon-simpleaspectsandwillbecarriedoutgraduallyasthevarioustoolsinvolvedmovefromalphatobetatofullpro­ductionversionsover2023-25. InparallelwiththematurationofHyperon,thevariousSingularityNETecosysteminfrastructuretoolsarebeingrapidlybuilt out. AsroughlyindicatediFigure3,theSingularityNETplatformstrategyfor2024involvesaparticu­
larfocusondecentralizedhostingandutilization(withinLLMs,earlyHyperonversions 

Figure 3: Rough tentative roadmap for some of the key development initiatives regarding the SingularityNET platform 
andotherAItools)ofknowledgegraphscoveringvariousparticulardomains,segueingasHyperonmaturestoafocusondecentralizedhostingandinterconnectionofAIser­vices playing a ”plugin” roletodecentralized Hyperoninstances. Thevariousvertical market specific projects spun off from SingularityNET Foundation (e.g. Singularity-DAO in the DeFi domain, Rejuve Network in the longevity domain, Mindplex in themediaarena)willthenfulfillaportionoftheirbusinessmodelsviaofferingappropriateHyperonpluginagentsonSingularityNET /Hyperon /NuNetinfrastructure. 

3.5 Compiling MeTTa to Rholang for Rapid Secure Decentralized Execution 
An additional twist to the infrastructure and formalism of Hyperon is the ongoingprojecttocompileMeTTaintotheRholanglanguage,whichisaimedattwopurposes: 
• 
enablingefficientconcurrentexecutionofMeTTAprogramsonappropriatehard­ware 

• 
enablingMeTTa’suseasasmartcontractlanguagefortheHyperCycleledgerlessblockchain(andpotentiallyotherchainsaswell) 


InsomeaspectsthelatterapplicationisorthogonaltoMeTTa’suseasanAGIlan­guage – it was noted above that the unique advantages and aspects of MeTTa as a programming language have some broader applicability beyond the AGI sphere. For instance, using MeTTa to write smart contracts for ledgerless DeFi makes total sense independently of AGI or even AI – because MeTTa lends itself to formal verifiabilityandefficientexecution,bothofwhicharecriticalinaDeFidomain. 
However, there are also a lot of obvious potentials for synergy in the dual use of MeTTa for AI scripting and AI-generated code within Hyperon systems, and forscriptingoperationsofHyperCyclenetworksinwhichHyperonsystemsareembedded.ThereissignificantpotentialherefordevelopingdistributedAIsystemswithsignificantamountsofemergentintelligenceatthedecentralized-networklevel.
The MeTTa/ Rholang interfacing project is being carried out in collaboration be­tweenSingularityNET,HyperonandLuciusGregMeredithandhiscompanyF1REFL3Y,which is the successor to his previous project RChain. RChain developed a novel blockchain technology centered on the Rholang smart contract language, a syntacticfront end for Meredith’s rho calculus, a novel mathematical calculus breaking new groundintheformalizationofconcurrentcomputationalprocesses. 

Figure 4: High level depiction of the control flow relating MeTTa to Rholang in the Hyperon architecture. 
Rholangdemonstrates remarkable propertiesinthe areaof secure, efficientexecu­tiononconcurrenthardware,includinginadecentralizedcontext. During2023Mered­ith and his team have been developing a source-to-source compiler from MeTTa toRholang, with the objective of granting compiled MeTTa the same concurrency andsecurityadvantagesofRholang.
Meredithsummarizessomekeyaspectsofthisworkasfollows: 
"If AI is going to be decentralized, it has to take on a lot of the characteristics of the blockchain. In particular, a node that runs some AI resource, like an LLM, or a theorem prover, or some combination of AI resources, will need to be robust against denial of service attacks. Likewise, a network of such 

Figure 5: High level depiction of a network of RNodes, used for evaluating distributed Rholang programs in a secure way. These. RNodes may interact according to a number of possible blockchain infrastructures, including Hypercycle. 
resources will need to be robust against the failure of any one node in the network. This is one of the motivations for integrating SingularityNet’s MeTTa language into F1R3FLY.io’s RNode. 
"The other reason is performance. At current performance RNode gets about 1000 transactions per second (tps) per node per processor, where a transaction is measured as a committed and durable communication of data from a data provider to a data consumer. This execution model is implemented in terms of a novel key-value database (KVDB) called RSpace. The main novelty is that both data and continuations are stored at keys in RSpace. The execution mechanism is programmed via a smart contracting programming language called rholang. The MeTTa2Rho compiler compiles the language MeTTa into rholang. As a result, MeTTa execution scales as a network adds nodes that also add processors, because rholang execution scales as the network adds nodes that also add processors. However, the benefit of compiling MeTTa into rholang doesn’t just stop at scaling. 
"Indeed, the network of RNodes are all running under a consensus algorithm called CBC-Casper. This ensures that all the nodes have copies of the same execution state and as a result, if one or nodes fail, the network can continue to operate. Further, to execute some rholang a node requires the client to pay for the computation and storage associated with a token associated with the network. This constitutes a prophylactic against inevitable denial of service attacks." 
Figure4givesanoverviewofthecontrolflowinvolvedhere. AsMeredithexplains, 
"Per the diagram a MeTTa client (which could be a human user or a computational agent) submits a legal MeTTa program to the system. In this version we assume it first hits a gateway which forwards it on to a node in the network. However, it is perfectly legitimate to have the user submit the program directly to a node. These nodes are modified versions of RNode that contain a MeTTa2RHO compiler. The compiler transforms the MeTTa program into rholang which is then run against the node. 
"In the production implementation the execution produces a run log which is then verified by all the other nodes in the network. If there are any results, they can be safely communicated back to the user at the end of the verification phase, or optimistically communicated at the end of the target node’s execution of the rholang."
Figure5looselydepictsthenetworkofRNodes. AsMeredithnotes,A network for RNodes (often called a shard) consists of some deployment of nodes in various geographic locations, e.g. some nodes in AWS US-West, some nodes in GoogleCloud UK, some nodes in IBM Cloud EU, etc. These nodes are linked by an implementation of Kademlia, together with CBC-Casper. A client signs a request for execution. 
The signature is used to find a wallet that must contain enough tokens to execute the compute and storage associated with the rholang." 
"The compiler being developed from MeTTa to Rholang is detailed in the paperMeta-MeTTa: An operational semantics for MeTTa [MGWV23]. 
While the details are quite involved the core approach is relatively simple: Essentially, MeTTa’s semantics is given by a register machine; and that register machine is easily compiled into rholang in a correct-by-construction design pattern. 
The process of making this compilation work has also been valuable in terms ofshapingthefeaturesetofMeTTaitself;forinstance 
• 
Sealedterms:TopreventunwantedinformationleakagefutureversionsofMeTTawillsupportameansofsealingatermfromoutsideprobes. 

• 
Comprehensions:Toallowfordefensiblecommunicationwithresourcesacrossa trust boundary future versionsofMeTTa will support a notion of comprehen­sions. 


havebothbeenaddedintoMeTTaasaresultoftheF1REFL3Ycollaboration,andboth promisetohavevaluableapplicationsbeyondthesmart-contractapplication(e.g. asoneexample,comprehensionsprovideasimpleexplicitrepresentationofPLNsemanticsattheMeTTalevel). 

3.6 TheNeedforaCognitiveAGIR&DPlatform 
A number of difficult, complex choices were faced in choosing the architecture we’vedescribed for the Hyperon platform, and we certainly can’t say we believe the currentHyperon system is the only workable approach. However we do feel it has significantadvantages to anything else out there today, or anything else whose development weknowtobeunderway. AlexeyPotapovemphasizestheneedforacognitiveAGIR&Dplatform, at the current stage of evolution of the AI field, via first summarizing somerelevantlimitationsofLLMsasfollows: 
"Deep learning has been showing breakthrough results in different domains during the last decade. The recent results achieved by LLMs make us wonder if they bring us close to AGI. However, their limitations, such as lack of memory and world models, are also obvious, and they are increasingly being overcome with the help of symbolic methods through neurosymbolic integration. 
"There are dozens of wrappers over ChatGPT or LLaMa such as Langchain, AutoGPT, Voyager, etc. They are pieces of ad hoc code in imperative programming languages, which implement different non-composable ways of controlling LLMs. 
This is needed, because LLMs are a sort of ”language reflex”, which benefits from symbolic control even for specific practical applications. 
"Let us consider LLMs as a candidate for AGI. Imagine that we want an LLM to play chess. How will it do this? At best, it will generate an external call to Mu Zero. But will it be able to control Mu Zero at each move? No. The LLM will have no idea of the current situation on the game board. Imagine, we ask LLM not just to play chess, but to checkmate with the rook. How will LLM be able to pass this information to Mu Zero? Will Mu Zero be ever able to take this information into account by itself? Not at all, without modifications or possibly retraining. Now imagine that we ask LLM to play on two boards simultaneously and to use the same type of piece during the same turn on two boards. Should the LLM coordinate two instances of Mu Zero on each turn? Yes, but it cannot do this, it has no idea regarding the game situation and internal processes in Mu Zero. In order for an AGI system to do such sort of things, it needs to have a shared representation of different aspects of the world including language, and an integrative decision-making or action-selection process based on it. 
"An adept of deep learning would say that we just need to train a huge DNN on all the real-world data we have, which will learn such this representation together with strategies of using it by itself. However, such the approach (if it ever workable) is far beyond currently available computational resources and data, while capabilities of modern symbolic systems as components of neurosymbolic cognitive architectures are still highly underutilized and underexplored. " 
LLMsarealreadybeingusedascrudehubsforintegratingadiversityofAImeth­odsfromdifferentparadigms,implementedasLLMplugins. However,black-box-styleshallowintegrationviapromptsisquitelimitedinnature,andacognitivelyricherarchi­tecture can allow combination of methods from different AI paradigms in subtler andmorepowerfulways. AsPotapovpointsout, 
"Different paradigms and methods in AI did not arise by chance. They have different strengths and weaknesses. LLMs also quickly became integrated with different external tools, because solving problems in different domains is better done by different means. 
"Hyperon supposes a full interoperability of different paradigms. The core operation in Hyperon is retrieving information from storage in a general way such that this operation covers queries to (meta)graph knowledge bases, pattern matching in functional programming, unification in logical reasoning, and even operations performed by attention heads in Transformer networks or other neural modules. Chaining of such operations allows constructing a Turing-complete language, which serves as a ”cognitive assembler” and a generic approach to implementing declarative and procedural, episodic and semantic memory together with different forms of processing information in them. Different types of storages can be used simultaneously, and queries to them can be composed. By default, it is a metagraph knowledge base with symbolic queries, Atomspace, which can contain subsymbolic atoms as well. However, entirely neural spaces can also be used based on hyperdimensional vectors, graph embeddings, attention mechanisms or just prompt-based querying. Query chaining is described by the content of spaces (or memory from the cognitive perspective) themselves, which allows them to be implemented in an arbitrary way as well as to be learned. As a result, different strategies of declarative reasoning as well as other inference strategies such as probabilistic or genetic programming or neural module networks can be implemented and combined. For example, neural module networks can be assembled on the fly by symbolic reasoning or by themselves, as well as declarative reasoning can have symbolic or neural implementation. 
"While we suppose implementing some concrete ideas and AGI theories as Hyperon modules, AGI is still a wide R&D domain, and Hyperon is a platform precisely for AGI R&D with the focus on cognitive synergy between different paradigms, approaches, techniques. This makes Hyperon different from other proto-AGI systems, which are typically built around one particular theory and are difficult to use in AGI R&D, which goes beyond this theory. 
"While DNN-centric solutions typically use quite weak symbolic overlays, advanced symbolic systems are usually integrated with DNNs in a shallow way. Hyperon allows incremental development of multi-paradigmatic interoperable components with strong both symbolic and neural parts, which makes it not only a platform for research and prototyping, but also a promising framework for developing a concrete AGI system. If s multi-paradigmatic integrative approach is more efficient than mono-paradigmatic, then Hyperon has chances to become a leading AGI platform." 


4 TheCogPrimeCognitiveModel(andBeyond) 
The Hyperon software framework can be adapted to implement a variety of cognitivearchitectures and AGI approaches. For instance, it can be used to create chat systemsthatanswerquestionsinaone-offbasis,theoremprovers,orevencognitivearchitectureswith resemblance to the human mind. That said, there is a fairly particular cognitivearchitecture that has been at the center of OpenCog development since the beginning,continuingintotheHyperonera. Inthissectionwewilldiscussthis"historicaldefault Hyperoncognitivearchitecture"andsomeadditionalideasaswell.
ThemostthoroughpresentationoftherecentincarnationsoftheCogPrimecogni­tivemodelaregiveninGoertzel’s2021 General Theory of General Intelligence paper[Goe21d],whichcontainsdetailedpointersintoanumberofotherrelevantrecenttech­
nical research papers. The review we’re about to give here is less mathematical andhigher-level, and aimed more at getting across the basic concepts than giving a richunderstandingoftheunderlyingtheory. 
4.1 CogPrime:Hyperon’sHistoricalDefaultCognitiveModel 
CogPrimeisasomewhatflexiblydefinedcognitivearchitecturethathasbeencentrallypursuedthroughoutthe history ofthe OpenCogproject; itwasput together in 2012inthe context of OpenCog Classic, but still applies perfectly well in the Hyperon con­text. This architecture has been called ”CogPrime” in various publications, although this nameneverparticularly caught on. Neverthelesswebelieve itis important todis­tinguishOpenCogasasoftwareframeworkfromparticularcognitivearchitecturesthatmaybeimplementedwithinit. OpenCogHyperonasaframeworkhasbeendesignedin substantial part to meet the needs of theCogPrimearchitecture, buttherehavealsobeenotherdesideratainmind,anditisquitepossiblethatHyperonwillbeusedtoex­plore other architectures besides CogPrime, and/or that CogPrime will heavily evolveashands-onAGIR&DwithCogPrimeinHyperonproceeds.
The primary reference on CogPrime is the 2-volume book Engineering General Intelligence from2014[GPG13a][GPG13b]. Tosimplify alotofcomplexity, what isgoingoninCogPrimeis: 
• 
PerceptionformingAtomsinAtomspace,linkedinwithrepresentationsinotherspacessuchasneuralones 

• 
Actions comprised as Atoms in Atomspace, then in some cases translated intootherrepresentationsforactuation(e.g. neuralactivationpatterns,Rholangpro­grams...) 

• 
Ambient cognitive activity occurring in Atomspace, e.g. importance spreading(inwhichvariousimportancevaluesspreadamongAtomsaccordingtotheircon­nections), concept formation (which builds new nodes representing new ideasfrom existing ones), reasoning (which builds new relationships from existingones). Thisisspontaneous,self-organizingactivity,notdirectlydriveninagoal­orientedway. 

• 
Goal-oriented activity, wherein the system using reasoning to select (and syn­thesize) actions that it believes have high odds of achieving its goals given itsperceptionofthecurrentcontext 


Multiple cognitive processes, represented by multiple MeTTa scripts, combine tomake all this happen. The precise mix of cognitive processes is subject to ongoingexperimentation,butaninitialverydetailedhypothesisisgiveninEngineering General Intelligenc from2014andsummarizedaswellasmoreconciselyonlinein??. Aquick summaryofsomehighlightsis: 
• 
ECAN, Economic Attention Allocation, for spreading short and long term im­portancevaluesamongAtoms 

• 
PLN, Probabilistic Logic Networks, for drawing uncertain-logical conclusionsfrom collections of observations, and from knowledge obtained via natural lan­guage,mathematicsorothersources 

• 
Conceptblending,”mapformation”,Occam’s-Razor-driven”conceptpredicati­zation”andotherheuristicsforformingnewconceptsbasedonexistingevidenceandexistingconcepts 

• 
Evolutionarylearningforevolvingnewsub-networksoftheAtomspacesatisfy­inggivencriteria 

• 
Probabilistic procedure and predicate synthesis, for creating new content basedontheprobabilisticdistributionsimplicitintheAtomspaceandotherspaces 

• 
Pattern mining, for creating new predicates representing observed patterns in Atomspaceandotherspaces 

• 
Goal refinement, for creating, eliminating and merging subgoals based on thesystem’sgiventop-levelgoals 

• 
Goal-driven action selection, for choosing actions that appear likely to achievesystemgoalsgiventheperceivedcontext 

• 
”Autopoietic”systemsofrewriterulesthatrewriteoneanother,thuscreatingau­tocatalytic systems of intercreating rules (an approach sometimes called ”Co­gistry” 
in 
the 
OpenCog 
context 
[Goe22], 
and 
in 
some 
ways 
resembling 
the 
useofReplicodeintheAeracognitivearchitecture[TH12]) 




Figure 6: Illustration from Engineering General Intelligence [GPG13b] 
depicting 
the key high level components needed to support CogPrime or other similar human-like cognitive architectures. This is very similar to the basic outline of the Standard Model of Mind, basically filling 
in 
a 
modest 
amount 
of 
additional 
detail 
to 
Figure 
16. 

In the Hyperon architecture, every one of these processes occurs centrally in the Atom-space, initially via a combination of hand-coded MeTTa and then learned MeTTa code filling in the details. The potential role played by LLMs here is not localized but rather spread among various components –for instance, LLMs may be a big part of the story regarding language; they can be one among multiple forms of long-term memory; they can serve as a source of both reactive and deliberative processes, though with limitations in both cases that indicate they should be coupled with other reasoning and learning processes. 

Figure 7: Illustration from Engineering General Intelligence [GPG13b] 
depicting 
the key components involved in carrying out action processes within CogPrime or other similar human-like cognitive architectures. 
One way to implement this using current technology is to leverage deep neural networks for the action (e.g. right and left arm) and reinforcement hierarchies, and to use Atomspace based MeTTa procedures as the core modality for motor planning. The magic that needs to happen here is fluid coordination between the symbolic action plans in MeTTa and the neural nets’ capability for movement synthesis. It can’t just be a matter of: MeTTa emits a high level plan, and then the neural net figures out how to separately carry out each action in the high level plan. Rather, the high level plan as a whole has to be taken by the neural nets as context for the synthesis of actions corresponding to each part of the plan, which can then allow detailed motor execution in a way where each sub-action is carried out in a way that reflects the overall movement series of which it is a part. 
This is a fantastic use-case in which to explore neural-symbolic integration, and one we plan to explore in a physical robotics context via collaborations with Hanson Robotics, Awakening Health, Mind Children and other partner projects; it will be desirable for the open robotics community to become involved in customizing Hyperon for such purposes as well. 

Figure 8: Illustration from Engineering General Intelligence [GPG13b] 
depicting 
the key components involved in carrying out language processes within CogPrime or other similar human-like cognitive architectures. 
Transformer neural networks such as LLMs obviously comprise one highly effective way of implementing coupled comprehension and generation hierarchies (where the two hierarchies are richly interpenetrated. more than separated and then closely linked). If symbolic pattern recognition and inference are used to recognize (probabilistic and/or crisp) formal linguistic rules corresponding to the content within an LLM, then these inferred rules will also presumably be naturally arranged in a hierarchy, most likely with the same rules predominantly used on both the comprehension and generation sides. 
Close linkage with perception, action and cognition is clearly critical to language and is under-emphasized in current LLMs. Part of the cure for LLM hallucination is surely inferential connection of LLMs with knowledge graphs containing assumed ground truth, but connection of LLMs with direct perceptual and active groundings can be another valuable way to supply the needed connection between LLM patterns and non-linguistic realities. 
. 

Figure 9: Illustration 
from 
Engineering 
General 
Intelligence 
[GPG13b] 
depicting 
the 
key 
com­
ponents involved in working-memory processes within CogPrime or other similar human-like cognitive architectures. 
In Hyperon the majority of these components are implemented within Atomspace, and their presence in ”working memory” is indicated by their possession of Short=Term Importance values above a critical threshold (the Attentional Focus Boundary). Associative memory may be efficiently implemented via hypervector embeddings of Atomspace. Aspects of sensory, sen­sorimotor, action and linguistic memory may be stored in neural networks or other subsymbolic components; however it’s important that aspects of these are also represented in symbolic form so they can be flexibly manipulated. 
The dynamics of the Global Workspace Theory [BF09], 
which are diagrammatically sug­gested here, are manifested in Hyperon most proximally via the spreading of importance values between the Atoms in the Attentional Focus and those outside it, according to the ECAN (Economic Attention Allocation) equations. 
LLMs lack a working memory in any richly structured sense, which is part of the reason interacting with them feels more like interacting with a utility than with another human-like cognitive agent. Various projects building interactive characters based on LLMs are building various sorts of external working memories to cooperate with LLM dynamics. However, in the end a working memory can’t really do its job without a fairly flexible symbolic representation, because part of what has to happen inside a working memory is that the different items it contains need to get varied and combined in a diversity of ways (and efficient flexibility of manipulation is almost equivalent to "symbol-ness") 

In Hyperon, this is in many ways the crux of what Atomspace does – it serves as a long­term memory including knowledge of multiple different kinds, handling them all according to a shared meta-representational fabric (of typed metagraph nodes and links); and it serves as a store as well for the procedures enacting cognitive processes such as the ones filling the roles articulated in this diagram. 
In many cases the same Hyperon algorithm can fulfill wholly or partially many of the functions indicated here. For instance PLN can help with reasoning, procedure learning, storytelling, reinforcement learning, credit assignment and planning. Evolutionary learning can help with procedure learning, reinforcement learning and concept formation. Etc. 
Many of the functions indicated here are carried out in Hyperon by multiple concurrent and/or cooperating processes – e.g. concept formation may happen by evolutionary learning, by concept blending, by (e.g. paraconsistent uncertain) formal concept analysis, or by a variety of other heuristics. 
For human-like cognition to happen, we need all these processes occurring concurrently in the same large Atomspace metagraph – this is how you get the cognitive synergy that leads to emergence of large-scale mind-structure patterns such as a self-model or an active self-modifying concept hierarchy/heterarchy. 

In the modern AI world, visual and auditory perception are in many ways effectively han­dled by hierarchical neural networks trained on large corpora. However, we believe there are also levels of perceptual understanding that can more effectively be achieved via linking these hierarchies in with symbol hierarchies in Atomspace, which explicitly represent the compositional structure of sensory data. 
Olfactory and somatosensory perception are less hierarchical in nature; indeed there is some evidence that olfactory pattern recognition in human cortex is based on nonlinear dynamics and strange attractor or transient 
formation 
[Fre95]. 
Clearly neural models of these are possible but are not currently existent in mature form. Symbolic understanding may be more valuable in terms of interconnecting lower-level sense perceptions among these very differently organized modalities; and this may be even more strongly the case for non-human AGIs which may have a much greater diversity of sensory channels. 
These are all processes operating within MeTTa-based Atomspaces, which may theninteroperatewithneuralspacesandotherresources.
Figures6,7,8,9,11,10summarizethekeycomponentsinvolvedincarryingouthuman-levelgeneralintelligencefunctionsaccordingtotheCogPrimecognitivemodel.The relationships between these cognitive components and software components getsabitcomplex–somecorrespondtospecificsoftwareprocesses,butmanyareintendedto be contributed to by multiple OpenCog software processes, and in many cases thesame OpenCog software processes may underlie multiple of these functions. For in­stancetheHyperonAtomspace(asoftwarecomponent)isusedforbothdeclarativeandproceduralmemory(cognitivecomponents). NaturallanguagecomprehensionmaybecarriedoutbyacombinationofLLMswithAtomspace-nativeprocesseslikePLN.Etc.TheCogPrimeAGIdesignaspresentedinEngineering General Intelligence comprisesadetailedtheoryofhowtoachievethesevariouscognitivefunctionsusinga. particularsetofAIprocesses,centeredontheonesinthebulletlistjustabove.
It’sconvenienttopresentcognitivearchitecturesintermsofbox-and-linediagrams,but of course much of the magic of cognition happens in the interactions and interde­pendenciesbetweenthecontentsofthevariousboxes. Alongtheselines,akeyconceptunderlyingtheCogPrimedesignisthatof"cognitivesynergy",whichhasbeenformal­izedusingenriched 
categories[Goe17]butintuitivelyis 
verysimpletounderstand: 
Itjust means that the various cognitive processes work together rather than against eachother,sothate.g. whenoneofthemgetsstuckincarryingsomethingout,itcantrans­lateitsintermediatestateintothenativelanguagesofothercognitiveprocessesandaskthem 
for 
help. 
Figures 
12, 
13, 
14, 
15, 
drawn 
from 
Engineering General Intelligence, illustratesomeofthesynergiesbetweenspecificcognitiveprocessesthataresuspectedtobecriticalforachievingadvancedAGIusingtheCogPrimeapproach. 

4.2 Toward a General Theory of General Intelligence 
Goertzel’s 2021 General Theory of General Intelligence [Goe21d] 
paper, 
building 
ona 
number 
of 
just-prior 
research 
articles 
[Goe21c] 
[Goe21b] 
[Goe20a] 
[Goe20b], 
en­
deavors to formulate the core notions of the CogPrime architecture within a commonelegantmathematicalframework,aimingbothtoelucidatethekeyideasunderlyingthediverse memory, learning and reasoning mechanisms involved, and to make it morestraightforwardtocreatehighlyefficientandscalableimplementations.
TheGTGIapproachinvolvesmorepreciseformulationsofthenotionthatdifferenttypesofmemoryrelevanttohuman-likecognitioncanberepresentedasdifferenttypesystemswithinatypedmetagraph,andmorphismsthenarticulatedbetweencategories 




corresponding to these different type systems. It is also argued that, to a reasonabledegreeofapproximation,thecorealgorithmsrequiredforhuman-likecognitionrelatedto thevarious neededmemorytypes canberepresented by way ofGaloisconnectionsasvarioussortsoffoldingandunfoldingoperationsonmetagraphs. Thissuggeststhatseeminglydiversecognitiveprocesseslikehierarchicalperceptionandactionlearning,logical reasoning and evolutionary program learning can perhaps all be implementedefficientlyifonehasanefficientsubstrateforcarryingouttheappropriateformsoffold­ingandunfoldingonlargemetagraphs. ThisobservationandothermoresophisticatedvariationsplayedalargeroleinthebasicdesignoftheMeTTalanguage,whichprovidesaninfrastructureinwhichthesesortsofmetagraphoperationscanbeimplementedinawaythatisbothsuitablyabstractandappropriatelyscalable. 

4.3 Hyperon,CogPrimeandtheStandardModelof(Human-Like) Mind 
Aswe’venotedabove,theHyperon/CogPrimeapproachtocognitionaroseviaacom­binationof sources, e.g. philosophyofmind, cognitivescience, computer scienceandmathematics,linguistics,andsoforth. Theunderlyingreasoningistoorichanddiversetoconciselysummarizehere. However,tokeepthingsrelativelysimpleforexpositorypurposes,oneusefulwaytoconsiderthiscognitiveactivityisbycomparisontowhat’sknownaboutthehumanmind(i.e. tofocusontheacognitivescienceangle).
AthoroughanalysisofCogPrimeinthecontextofalltheprocessesdepictedinFig­ures6,7,8,9,11,10andtheirprincipalsubprocesseswouldgofarbeyondthescopeofanoverviewlikethis;basicallythatisthetopicofEngineering General Intelligence, vol. 2. Amoreconciseiflessinformativeapproachistolookatasimplifiedmodelofhuman-likecognitionsuchastheso-called”StandardModelofMind”.
PaulRosenbloomandanumberofotherlong-timemembersofthecognitivearchi­tectures community (which was a fairly major subset of the AI community before therecentshifttowardlargeneuralmodels,andisstillavibrantsub-fieldwithinacademia)havesynthesizednumerousempiricalandtheoreticalinputstoformwhattheycallthe”Standard Model of Mind,” very 
loosely 
depicted 
in 
Figure 
16. 
While 
one 
could 
nit­
pickatvariousdetails,onthewholeIthinkthishasbeenanambitious,worthwhileandfairlysuccessfulattempttosynthesizeandsummarizethecommonelementsamongtheunderstandings of human-like cognition to emerge from a diversity of cognitive psy­chology, cognitive neuroscience and AI initiatives. It’s reasonably interesting to lookathowtheHyperoncognitionapproachcomparestothevariouscomponentsidentifiedintheStandardModelofMind. 

AbriefsummaryoftheStandardModelofMindwasgiveninBenGoertzel’srecentpaper ”Generative AI vs. AGI” 
[Goe23], 
so 
we 
won’t 
repeat 
that 
here. 
We also gavethere a run-down of what we see as the strengths and weaknesses of LLMs along thevarious key components identified by the Standard Model. Of course, neither LLMsnorHyperoncurrentlyexcelatalltheseaspects,andweareconsciousthatit’snotfairto compare the current state of LLMs versus the hypothesized future capabilities ofHyperon. However, it is ourstrong(and we believefairly educatedand well-founded)intuitionthatitwillnotbepossibletoremedythenumerousshortcomingsofLLMsrel-ativetotheStandardModelwithoutradicalrevisionsandadditionstotheirarchitecture, whereasHyperonalreadyhasembeddedinitscorearchitecturetheabilitytofulfillallaspectsoftheStandardModelandmore.
We now proceed through key components of the Standard Model, explaining howtheyarehandledintheHyperon/CogPrimecognitivedesign: 
4.3.1 Episodic Memory 
Episodic memory, memory of an agent’s life-history, is most centrally manifested inCogPrimeviaaparticular”episodicindex”thatpointsintoothermemorystoressuchastheAtomspaceandneuralspacesstoringsensorymemories. Thenatureoftheepisodicindexisthatitneedstoefficientlysupportparticularkindsofqueriessuchas: 
• 
Searchforitemssimilartoagivencue 

• 
Searchforitemsmatchingapartially-completecue(particularlywherethecom­



pletioninvolveselementsthatarephysicallyortemporallyconnectedtotheomit­
tedparts)? 
• 
Searchforitemsthatwereatsomepointphysicallyrelatedtoagivencue 

• 
Searchforitemsoccurringatthesametimeasagivencue 

• 
Searchforitemsoccurringatthesameoranearbyplaceasagivencue 


One well fleshed out way to create index structures well-suited for these sorts ofqueries is to use hypervectors (large sparse bit vectors or integer vectors). Hypervec­tors were pioneered by Pentti Kanerva in the 1980s, but like many other classical AIparadigmshavebeguntofinallyfulfilltheirconceptualpromiseinthemodernerawhensuppliedwithcurrentlevelsofcomputepoweranddata.
Inthisapproach,aHyperoninstancewillcontainahypervectorstorethatcontainshypervectorembeddingsforAtomsinAtomspaces,aswellaspotentiallyforobservedactivationpatternsintheneuralnetswithinneuralspaces.
Thehypervector-basedapproachhastheancillaryadvantagethatqueryprocessingusinghypervectorscanbeefficientlyimplementedontheGSIAPUchip(thesubjectofcurrentexperimentation),ortheSimulihypervectorchip(thelattercurrentlyinproto­typingphase). 
4.3.2 Working Memory 
Working memory, in a Hyperon Atomspace as used in CogPrime, consists in effectofthe AtomswithsufficientlyhighShort-Term Importance (STI)values. Thedynam­ics of ECAN can be configured so that Atoms with STI above a certain threshold areconsideredthe ”AttentionalFocus” andsubjecttodifferently-tunedECANparameters.Various cognitive processes may then be configured to select Atoms from AttentionalFocus for various purposes, and Atoms from the rest of an Atomspace for other pur­poses.
ThemovementofAtomsbetweenAttentionalFocusandtheremainderofanAtom­spaceisgovernedbythedynamicsofECANaswell,andmaybetunedtokeepthesys­teminareasonableattentionalregime,avoidingthepathologiesofobsessive-compulsivenessor scatter-brainedness. A number of practical experiments in this regard were carriedoutonOpenCogClassic[HGI+14][BGH+18][GBIY16].
SingularityNETChiefAIOfficerMattIkle’,whohasbeenworkingonvariationsofECANinvariousAIsystemssincethelate1990s,providesthefollowingsummaryofseveralaspectsofthissortofsystemdynamic: 
"One of the critical challenges confronting any system aimed at advanced general intelligence is the allocation of computational resources. Hyperon’s attention-allocation system is provided by the Economic Attention Networks (ECAN) module. Founded upon an economic metaphor, ECAN serves as a key element in driving Hyperon’s dynamics toward self-organizing emergence of the sorts of complex high-level network structures we believe are required to achieve Artificial General Intelligence. 
"In terms of structure, ECAN is a graph of untyped nodes, and links that may be typed as HebbianLink. Each Atom in ECAN is weighted with two numbers, STI (short-term importance) and LTI (long-term importance.) A system of equations, in which STI and LTI values are treated as artificial currencies, governs importance-value updating. These equations spread importance among various atoms within the system based upon the importance of their roles in performing actions related to the system’s current goals. An important concept within ECAN is the attentional focus, consisting of those atoms currently deemed most important by the system in terms of achieving its goals. As we port ECAN to the Hyperon framework, we will leverage enhancements aimed at speed and efficiency. One possible enhancement would be to use the natural gradient (the gradient over probability distributions) to follow the direction of steepest descent on the space of loss functions of the parameter space. In initial experiments, such an approach displayed dramatic speed and accuracy improvements. 
"We also foresee several algorithmic and architecture improvements designed to guide the process in which ’complexity emerges from simple and stable building blocks’. As described in more detail in the section on Hyperon complex dynamical systems, we envision construction of waypoints, aligned with observed natural quantities, to help guide development leading to desired emergent phenomena at multiple scales. We also plan to experiment with measures, such as Tononi’s Phi, that appear related to sentience and consciousness." 6 

4.3.3 Procedural Memory 
Proceduralmemory, inHyperon, consists at themost basic levelof MeTTaprograms.However, MeTTa is a meta-language by nature, and by implementing different typesystems in MeTTa one can make it ”impersonate” a variety of different programminglanguages,logic-programmingandfunctional-programmingparadigmsbeingthemostnatural. Using this facility, procedures of different sorts (e.g. cognitive heuristics forproving math theorems, procedures for controlling movements of a robot, procedures 
6Some prototype work measuring Tononi Phi in OpenCog Classic while carrying out practical tasks isdescribedin[SCA+] 
for directingtheflow of a natural language dialogue)may potentiallybe implementedin different sub-languages represented by different MeTTa type systems. Such typessystems can initially be implemented by human programmers, but the reflective na­tureofMeTTaalsomakesitnaturalfortypesystemstooriginateviathesystem’sownlearning and reasoning.? It’s also key to understand the role played by appropriateabstraction in the representation of cognitively meaningful procedures. Much of the procedural knowledge relevant to human-like cognition is vague and uncertain, andconsistsofhigher-levelprocessesthatneedtobeinstantiatedasparticularprocessesinacontext-dependent way, usingintuitivereasoning. This meansthatprocedureexecu­tionissometimesstraightforwardMeTTaprogramexecution,andsometimesasubtlercognitiveprocessofmappingavague/abstractnetworkofAtomsintoapreciseMeTTaprogramsuitablefordirectexecution.
The vague/abstract networks of Atoms representing general procedures will oftenleverage special Atom types referring to temporal or causal relationships. SignificantprototypingworkhasrecentlybeendoneinvolvingtemporalreasoningonAtomspaces,forinstanceinthecontextofcontrollingsimpleagentsinMinecraft[PG22],orplayinggameslikePong 7. 
Conversion between procedural and declarative knowledge then takes the form ofCurry-Howard-like correspondences (e.g. Greg Meredith’s OSLF) between programsandlogicalexpressions[Mer23]. 

4.3.4 Reasoning 
Hyperon infrastructure supports a great variety of formal reasoning systems; differentlogics,forinstance,canfairlystraightforwardlyberepresentedbydifferentMeTTatypesystems. Avarietyofapproachestomanaginguncertaintyarealsosupported,includingfuzzy truth value algebra as well as first and higher order probabilities and various approximationsthereof.
ParticularattentionhasbeenpaidtoanuncertainreasoningframeworkcalledPLN(Probabilistic Logic Networks), which combines higher order fuzzy and probabilisticreasoning with predicate and term logic, along with human cognition motivated ap­proaches to intensional and causal reasoning, in a formalism that explicitly groundslogicalknowledgeintheobservationsofacognitiveagent.
The biggest challenge for PLN (and every other logical reasoning system) has al­ways been inference control – the choice of which logical inference steps to carry outinwhichcontexts. Avarietyofheuristicscanbeutilizedhere,butwebelievethecore 
7MeTTAforPongisAug2023prototypingworkbyPatrickHammer 
approachneedstobereflexiveandhistory-based. Basically: 
• 
Dosomesimpleinferences,onsomesimplereasoningtasks 

• 
Dosomepatternminingtofigureoutwhatseriesofinferencestepshaveworkedwellinwhatcontexts,forthesimplereasoningtasks 

• 
Dosomeinferencetofigureoutabstractprincipledunderlyingtheresultsofthe patternmining 

• 
Usetheresultsofpatternminingandinferencetosynthesizenewseriesofinfer­encestepsfornewproblems,enablingthesystemtocarryoutslightlylesssimpleinferencesEtc. 


Whilethisapproachisconceptuallystraightforward,itrequiressignificantscaleinorder to succeed. This will be a key focus of Hyperon R&D in the next phase, and itmay end up a beautiful example of an AI approach that has been around a long time,and was simply waiting for more data and more processing power to really come intoitsown. 
NilGeisweiller,theleaddeveloperandresearcheronPLNInbothOpenCogClassicandmorerecentlyHyperon,summarizesthecurrentstateofPLNinMeTTaasfollows 
small There are at least two features a reasoning system geared towards AGI must have. 
1. 
Flexible (chaining): it needs to be able to generate inference trees in any direction, forward (from axioms to theorems), backward (from theorems to axioms), outward (from lemmas to axioms and theorems), inward (from axioms and theorems to lemmas), and more generally "omniward" (from/to axioms, theorems, lemmas, corollaries, etc). 

2. 
Programmable (inference control): any computational step occurring during chaining should be interceptable, at a sufficient level of granularity, so that, given the right heuristical knowledge, provided or learned, the production of successful inferences can be made arbitrarily efficient. 


Early experiments with Hyperon/MeTTa has already shown excellent promises towards realizing the first feature. Indeed, by combining non-determinism and unification, which MeTTa possesses, we were able to implement a brute force omniward chainer with just a few lines of code [GYa] 
. Then use that chainer as the underlying engine of a port in-progress of PLN. Today, we can already do things what we were never able to do with OpenCog Classic, such that running direct evidence rules backward. So with Hyperon/MeTTa we have, it seems, already fully realized the flexibility requirement. 
The requirement of a programmable inference control is expected to be realized once minimal-MeTTa is completed, which should enable a human or machine programmer to overwrite the reduction step (as in beta-reduction) and interject any conditional to prune or prioritize non-deterministic reduction. 
Geisweilleralsonotesthat,onthesoftwareaswellasmathematicalandconceptuallevels,itseemstobeworkingoutinHyperontoconsiderpattern-miningasessentiallyaspecialformofinferencewithanunusualcontrolstructure: 
It’s been already established that pattern mining can be viewed as a specialized form of reasoning [GPG13b]. 
The advantage of adopting such a view is that it makes hybridizing simplistic syntactic-based pattern mining with sophisticated semantic-based pattern mining, natural and seamless. An additional advantage is that inference control can be used in both forms of reasoning, simplistic and sophisticated, to gain more efficiency. A proof-of-concept is currently being built using the Hyperon/MeTTa chainer. 
Another interesting twist in the PLN/MeTTa story relates the semantics of PLNexpressions to the use of comprehensions in MeTTa. As Greg Meredith has pointedout,comprehensionscanbeusedtoconcretelyimplementrealizablity-basedsemanticsforPLN.TheconnectionbetweenthissemanticapproachandthepresentationofPLNsemantics in terms of higher orderprobabilistic typesasalluded by Warrell’s analysis[WPVG22]appearsafertileresearchtopic. 

ExplicitLogicvs. LLMReasoning TherelationbetweenPLNreasoningandtherea­soningLLMscarryoutbearssomenotehere. ItwouldappearthatLLMsarecurrentlycapabletohandleabroadvarietyofhumancommonsensereasoning,aboutknowledgedomains well represented on the Internet. However, they fail badly at purely formalreasoning, and also at reasoning that needs to bridge the formal and commonsensical
(e.g. undergraduatephysicsoreconomicsproblems). Theyalsocannotbeexpectedtogeneralize to domains with radically different properties than the data on the Internetwhich was used to train them. The approach to LLM/Hyperon integration currentlybeing pursued, as outlined above, involves leveraging the strengths of LLMs for rea­soning about commonsense everyday situations along with the strengths of PLN formoregeneralreasoning,andcouplingthetwotogetherinavarietyofnaturalways. Webelieve this will provide a viable and relatively rapid path to conquering e.g. physicsandeconomicsproblems,andafterthattomoreambitiousgeneralintelligence. 
Thisapproach, however, shouldnotbeconstruedtoimplyajudgmentthatPLNinitselfcouldnotcarryoutcommonsensereasoningperfectlywellwithoutLLMs. Rather,we are quite confident it can do so; however we are open to the possibility that LLMs(in current or improved form) provide a more efficient route to commonsense reason­ing,becausesuchreasoningturnsouttobemoreaboutfiguringoutwhatmadesenseinprevioussimilarsituationsthanaboutcarryingoutchainsofsurprisingororiginalinfer­encesteps(whichiswhatscientificandmathematicalreasoningiscommonlyabout,andissomethingatwhichformallogicenginesseemtosignificantlyoutperformLLMs).
ItmayalsobeveryinterestingtoexploretheuseofLLMreasoningchains,mappedinto PLN reasoning chains, as data to feed pattern mining and inference used to learninference patterns that then guide PLN. This will be of limited use for formal reason­ing at which LLMs do poorly anyway, but may be useful to help guide PLN in mixedformal/commonsensicaldomains. 
Reasoning About Space and Time One aspect of reasoning that has occupied sig­nificanteffortinOpenCogClassicR&Disinferenceregardingspaceandtime. AsAGIresearcherHedraSeidnotes, 
"Spatial and temporal reasoning are fundamental cognitive processes that we use to make sense of our surroundings, predict outcomes, and make informed decisions in this dynamic and ever-changing world. As AI strives to achieve artificial general intelligence (AGI), it has made impressive progress in mimicking human cognitive functions. Within these abilities, spatial and temporal reasoning play key roles in understanding its surroundings and forecasting future events. Given this context, Hyperon appears to be a strong potential candidate for building such reasoning engine due to the following: 
• 
Structured Knowledge Representation: 

– 
Hyperon provides a structured framework for representing concepts, facts, relationships, and rules. 

– 
Provides rich and expressive language that can capture spatial (such as object arrangements and orientations), temporal sequences (such as causal chains and event orders) and general knowledge relationships with precision, making it suitable for various reasoning tasks involving complex details. 



• 
Type-Driven Development: 

– 
Hyperon’s type-driven approach encourages structured coding. 

– 
Types guide knowledge representation development, fostering well-structured, readable, and maintainable code. 

– 
Reduce run-time errors by identifying type-related issues during compilation. 

– 
Allows types to rely on values, creating expressive types, and facilitates proving properties such as event overlapping and sequencing. 



• 
Scalability: 


– Hyperon’s distributed Atomspace (DAS) is designed to handle large-scale knowledge representation which is particularly advantageous for spatial and temporal reasoning, which often involves extensive datasets and complex interactions." 
PLN’s capability for spatial and temporal reasoning has been developed recentlyin the context of the ROCCA project, focused on using PLN to control simple agentsachievingsimplegoalsinsimpleenvironments,similartotoydomainscommonlyusedto 
experiment 
with 
reinforcement 
learning[GYb]. 
As 
workwith 
Hyperon 
progresses,these same tools will be applied in more ambitiousvirtualworldslikeSophiaverse, inthecontextofphysicalrobotcontrolandinawidevarietyofothersettingsnecessitatingandbenefitingfromthegreaterscalabilityoftheHyperonframework. 
Enabling a Hybrid Approach to Solving Technical Problems While LLMs have proven rather capable at many sorts of commonsense reasoning, and at some sorts ofexamsliketheUSlawschooladmissionstest,theirperformanceatundergraduatesci­ence exams has been much less impressive. The Google Minerva system, speciallyfine-tuned for the purpose, gave a reported accuracy of around 30% at a collection ofproblemsdrawnfromMIT’sOpenCourseware,problemslike 
Each of the two Magellan telescopes has a diameter of 6.5m. In one configuration the effective focal length is 72 m. Find the diameter of the image of a planet (in cm ) at this focus if the angular diameter of the planet at the time of the observation is 45'' . or 
Preamble: A population of 100 ferrets is introduced to a large island in the beginning of 1990 . Ferrets have an intrinsic growth rate, ..max of 1.3yr-1 . 
Problem: Assuming unlimited resources-i.e., there are enough resources on this island to last the ferrets for hundreds of years-how many ferrets will there be on the island in the year 2000? 
Nowtheseproblemsareclearlynoteasyfortheaveragepersonwithoutafairbitofspecialstudyfirst. However,theyareverystraightforwardforatypicalsciencestudentwhoisreadingthetextsanddoingthehomework. 
Intuitively, there are four aspects to solving these problems: 1) English / common sense, 2) logical reasoning and problem solving, 3) arithmetic and algebra, 4) under­standingofthedomainarea.
GPT4asofSeptember2023seemstobequitegoodatsolvingtheseproblemsandalso someharder ones. In fact, GPT4withsome chain of thought type prompting canevensolvesomeconsiderablyharderproblemslike 8: 
An eclipsing binary consists of two stars of different radii and effective temperatures. Star 
However, 
asreportedin[Goe23], 
it 
fails 
onotherproblems 
thatare 
onlymodestlyharder,includingphysicsproblemslike 
The motion of a star through a disk galaxy can be modeled as a point mass m released from rest 
andnumbertheoryproblemslike 
Find all arithmetic progressions with difference of 10 formed of more than 2 primes 
ThesearetougherthantheonesMinervawastestedon,andaremoreatthelevelthatasmartadvancedundergradorgradstudentwouldbeabletosolvewithsomework,butsomestudentswithrelevantbackground. mightstillfailon.
The precise boundary of what LLMs can do is a moving target and complex innature. E.g. itseemslikejustalittledebuggingshouldletGPT4solvetheabovenumbertheory problem – but then there are a lot of other number theory problems which aremore involved in various ways yet still elementary and well within the grasp of goodhuman math students. Even given all the subtleties, some useful generalizations canbemade,oneofwhichisthatwhenaprobleminvolvesmultiplestepsofreasoningputtogetherholisticallyina"non-obvious"way,LLMsarelikelytogetconfused.
Howmightwesolvetheseproblems,includingtheharderones,usingintegrativeAIinaHyperonsystem? Tosimplifyabit–LLMsaregoodatthecommonsensereasoningpart, PLN inference is good at the logical reasoning part, and our "semantic parsing"initiative, aimed at parsing English into logic, provides a viable path to syncing upcommonsensereasoninginLLMswithPLNreasoning. Knowledgeofrelevantdomainareas can be obtained by parsing a lot of English text into logical form and importingit into an Atomspace. The only additional ingredient to these, needed to handle theseproblems, would seem to be some tooling for having PLN ground certain reasoningstepsincallstoanexternalcomputeralgebra/arithmeticsystem(suchasJuliaSymbolic, 
8See https://chat.openai.com/share/0c4070a1-5aca-4f8a-b2e0-b693efd37e53 
for Chat-GPT’ssolutionobtainedviachainofthoughtstyleprompting,versusfailurehttps://chat.openai.com/ 
share/c0dd1db0-7d78-4632-8b88-758429a2dbc0 
withoutchainofthought 
for example). So when e.g. PLN needs to simplify an algebraic equation, or check iftwoequationsareequivalent,orfactoranumberetc.,itrecognizesthatitshouldinvokeanexternaltoolforthisanddoesso. 
This is clearly not the exact strategy that humans follow, and it would be possibleto teach a Hyperon system to perform in a more humanlike way – doing arithmeticcalculations via learned MeTTa procedures, or via using a robot’s fingers to push thebuttonsofacalculator. However,theHyperonapproachisnottotrytopreciselycopythe way human solve each particular class of problems, but rather to use a cognitivearchitecture that captures the key AGI-relevant aspects of the human mind, and thenhave this architecture learn to solve problems in ways that leverage all the strengthsavailabletoit. 
LLMs and Hyperon in Automated Theorem Proving A step beyond these sortsof undergraduate science exercises is the use of AI to guide automated mathematicaltheorem-provingbeyondthelevelofelementarypuzzlesandexercises. ZarGoertzel,aresearcher in the use of various AI algorithms including LLMs to improve the perfor­manceofautomatedmathematicaltheoremprovers,explainssomeofthenuancesthatariseinthisdomainmakingaHyperonapproachparticularlyappealing: 
"To understand the shortcomings of LLMs for automated theorem proving, even when applied in a clever and appropriately configured way, let’s first look at a relatively successful application of LLMs in the. mathematics domain: The use of LLMs to generate programs that output mathematically meaningful sequences of integers, as pursued in the Alien Coding project [GOU23]. 

"For instance, the sequence (1,1,1,1,2,3,6,11,23,47,106,235,551,1301,3159,7741,19320,...) can be produced in a number of ways, e.g. the .. ' ..h term is the number of trees with .. unlabeled nodes. One can feed a short sequence like this to an LLM, along with a description of the meaning of the sequence – and then ask it to come up with a program that will rapidly produce the sequence, not only the terms given but the following terms as they get larger and larger moving toward infinity. 
"In this context, the first thing one generally wants to do is prove that a certain proposed program actually will generate the target mathematically meaningful sequence, for any ... However, LLMs cannot reliably do this right now. What they will do is check that a program correctly generates the first .. integers of the target sequence, instead of proving that the program is correct for all elements of the sequence, which is a much harder task. Thus, such programs as produced or evaluated by an LLM can only be considered probabilistically correct. But this is a domain where probabilistically correct, unless the probability involved is incredibly close to certainty, is usually not good enough. When programming or doing mathematics, messing up a single term in a moment of hallucination can create fatal execution errors or ruin a whole proof. 
"Hyperon provides a number of tools that seem potentially valuable for improving this sort of program synthesis. The MeTTa language is designed to facilitate the evolutionary exploration of the space of programming languages or proof calculi in which to generate or search for proofs. And it is also designed to work natively with probabilities and other ways of gauging uncertainty. If working with proof terms that only probabilistically represent what we wish them to, then we will wish to use probabilistic logic to reason about them, a function for which Hyperon’s PLN framework is ideally suited. 
”In general, the largest obstacle blocking LLMs from successfully coming up with proofs in this or other domains is their difficulty in chaining together multiple steps in a context-appropriate way. Memory is also an issue as one may wish to hold some parts of a proof in mind while working on others, which LLMs currently have no clear mechanism for, but a broader Ai framework such as Hyperon can facilitate. Interestingly, these two shortcomings also hold back traditional automated theorem provers in different ways; they also struggle with strategic construction of lengthy inference chains (which is why interactive theorem proving is so common) and with using various sorts of memory to guide choice of inference steps. Hyperon’s more cognitive approach has some promise for overcoming these limitations. 
"Hyperon also has potential for bridging the informal proof domain where LLMs have most promise, and the world of extremely detailed, low-level proofs where typical automated theorem-provers live. In Hyperon, the high-level proof sketch (similar to what mathematicians might outline) can be translated into formal logic for automated symbolic reasoning. This way, the strengths of LLMs and automated theorem provers can both be synergistically leveraged." 
4.3.5 ReinforcementLearning 
Reinforcementlearning,conceptually,isamatterofrewarding(increasingattentiontoandoddsofselectioninsimilarcontextsof)proceduresthathaveledtogoodresults,andpunishing(decreasing...) toproceduresthathavenotledtogoodresults... andchoosingnew procedures to try by varying appropriately on those that have been successful inthepast.
Inthissense,acombinationofECANwithPLN(appliedtologicalversionsofex­ecutable procedures) would be described as implicitly doing reinforcement learning,forexample. Augmentingthesemethodswithprobabilisticprogramsynthesis,andex­plicit induction of probability distributions from the set of procedures tried already,wouldbringsomethingabitclosertostandardreinforcementlearningalgorithms.
Itwouldalso bepossibleto implementclassicalRL algorithms in MeTTaandrunthemonAtomspace;however,thesehavewell-knownissuesdealingwithcomplexreal­worldsituationsinwhichthereisno rewardfunctiontiedin asimplewaytoagent ac-tions,orinwhichakeyroleisplacedbysubtleandmultidimensionalintrinsicrewards.
Robot actuation would seem to be a case where classical RL has a natural role to play. The interfacing of high level action planning with low level physical movementplanning might then take the form of probabilistic programming involving inductionof probability distributions spanning physical movements and action plans, where theprobabilisticprogramsynthesiswouldthenguideboththesearchintheclassicalRLal­gorithmguidingmovementsandthesearchinthemoreabstract”reinforcementlearninglikeECAN/PLNapproach” guidingplanning. 
4.3.6 LanguageLearningandUsage 
LLMs have shown tremendous proficiency in natural language dialogue and also at anumber of the standard tasks from the computational linguistics field. However, theydemonstrateseveredeficitsinsemanticunderstanding,especiallyincontextswherefor­malknowledgeplaysarole;andtheirlinguisticproductionslacksubtletyandaestheticsandtheabilitytocompel.
AsNLPresearcherAndresSuareznotes,"While the advent of Large Language Models (LLMs) has marked significant progress for natural language processing, the field still faces significant challenges. The Hyperon architecture, designed to integrate seamlessly with LLMs, offers a promising avenue for overcoming these obstacles. 
"Comprehension and generation challenges in NLP include 
• 
Ambiguity: A single sentence can have multiple interpretations based on its context; current models still can have trouble in complex situations that may be straightforward for humans. 

• 
Emotion and Tone: Accurately and consistently detecting underlying emotions, sarcasm, or humor in language is difficult for current models. 

• 
Dynamic Language: Language is ever-evolving, and models that cannot adapt risk becoming obsolete. 

• 
Contradictory statements: Observed especially when creating long pieces of text or balancing multiple pieces of information. 

• 
Faulty reasoning: While it’s currently possible to generate text that appears logical on the surface, it can contain logical leaps that don’t hold up under scrutiny. 

• 
Failure to incorporate information: Caused by a finite context window, and the inability to access an external database for real-time information. 

• 
Hallucinations: Lacking factual correctness in generated content. 


"Hyperon-based solutions to these issues could look like: 
• 
Integration with LLMs: The linguistic fluency inherent in LLMs can be synergistically combined with Hyperon’s structured reasoning capabilities for a more holistic approach to NLP. 

• 
Rich Knowledge Graphs: Hyperon’s architecture allows for the storage of extensive contextual information, thereby reducing ambiguity and enhancing overall coherence. 

• 
Grounded Reasoning: The ability to connect language models to real-world data, context, or sensory input can significantly improve both comprehension and generation. 

• 
Logic Engine: Hyperon’s Probabilistic Logic Network offers a framework for the explicit handling of ambiguous or incomplete information, allowing for more robust conclusions. 

• 
Continuous Learning: Hyperon is designed for adaptability, enabling it to evolve with the language and capture emerging nuances. 

• 
Feedback Mechanisms: The architecture includes feedback loops that facilitate continuous learning and refinement in NLP capabilities. 

• 
Fact-checking: Hyperon can cross-reference facts with its extensive knowledge base to ensure the accuracy of generated content. 


"Overall, the fusion of deep learning techniques with symbolic structured reasoning, as exemplified by the Hyperon architecture, holds the promise of revolutionizing NLP. This integrated approach not only aligns well with the capabilities of modern LLMs but also sets the stage for the development of NLP systems that understand and generate human language with unprecedented nuance, coherence, and contextual relevance." 
One way to look at many of Hyperon’s potential contributions here is in terms of the combination of statistical approaches to NLP (of which LLMs are the preem­inentexamplestoday)andmoreformal-linguisticsapproaches. AsBenGoertzelnotes, "Formalization of syntax, semantics and pragmatics has a long history; however, it’s also become clear that compact lists of formal structures lack the richness 
and subtlety to encompass natural language. What can be done by putting LLMs and Atomspace together is to create large-scale bodies of formal linguistic knowledge, including highly particular linguistic rules and also a hierarchy of abstractions and generalizations. This should allow close interfacing between declarative knowledge formed by PLN and other Hyperon cognitive mechanisms such as concept blending, and linguistic patterns and structures. This could be done in a variety of ways; one promising avenue is to leverage variations of the Word Grammar formalism, which leverages graph-based and logic-based structures for both syntax and semantics. 
"One can then envision a comprehension pipeline wherein LLMs are used to translate natural language sentences into a combination of logical content and formal (e.g. Word Grammar) syntactic content; and a generation pipeline wherein logical content is translated into syntactic content using formal syntactic content as a partial intermediary, thus providing an understanding of language going beyond surface-level syntactic corpus analysis and given potential for more profound linguistic inventiveness." 
4.3.7 MultimodalPerception 
Multimodalperception,inasense,iscurrentlyhandledfairlywellviadeepneuralnet­works; however, the sense in which these networks really understand what they areperceiving is fairly limited, which presents a challenge in terms of using them as theperceptualcorticesofanintegratedcognitionsystem.
The natural solution to this conundrum is to build explicit links between conceptsand relationships in Atomspace with concepts and relationships as represented in theweightandactivationpatternsinneuralnetworks. Thiscouldbedoneinvariousways;themoststraightforwardapproachwouldbesimplytolearnlinearornonlinearfunctionsmapping specific Atoms into combinations of neurons in the networks inside neuralspaces. Soforinstance,ifaHyperonsystemseesanumberofimageslabeledwiththeword”cat”,itcanthenlearnamappingfromtheAtomrepresentingtheword”cat”toa combinationofneuralinthevisualneuralspace.
The next step is inductive learning of the probability distribution characterizing alarge ensemble of such learned mappings. By probabilistic synthesis based on thisdistribution, new mappings can be inferred in cases where there is scant or even nolabeleddata. 
4.3.8 ActionLearningandCoordinatedAction 
ActionlearninginCogPrimeisnotfundamentallydistinctfromothersortsoflearning.It can be carried out via RL-like methods as mentioned above; or it can be carried out more purely by PLN inference or probabilistic program synthesis not tied to anyparticular reward function, ”merely” the pursuit of concise generalization of existingproceduralknowledge. 
4.3.9 GoalRefinementandGoalSystemManagement 
Hyperonisdesignedtobeusableforstronglygoal-drivensystemswithagreatvarietyof top-level goals, self-organizing networks with no intrinsic notion of goal, or inter­mediatecaseslikesystemsthataresubstantiallybutnotentirelygoal-driven.
ExplicitpursuitofgoalsisnaturallydonebyPLN,byRL-typemethods,orbyproba­bilisticprocedurelearningorevolutionaryprocedurelearning. Thesemethodscanquitenaturally balance multiple different goals on different time-scales, and even goals thatcontradicteachothertoasignificantextent. Explicitreasoningaboutinter-contradictorygoals is also relativelystraightforward using paraconsistent logic systems, which haveanaturalmappingintoPLN’suncertaintysemantics.
Top-level goals for a Hyperon system can be provided by human programmers;another option however is that they can be created via concept formation heuristicsand ECAN. A combination of these two approaches is likely appropriate. Creation ofsubgoalsfromexistingtop-levelgoalsisthenarelativelystraightforwardapplicationofconceptformationandPLNinference. 
4.3.10 Reflexive Self-Understanding 
TheAtomspaceisexplicitlydesignedforreflexiveself-understanding,inthesensethatMeTTa, PLN, pattern mining and other standard Hyperon/CogPrime cognitive opera­tionsareexplicitlydesignedtoactontheAtomspacemetagraphasinputdata,asaplacefor output, and as a substrate for storing interim results. This underlying design doesnot,ofcourse,automaticallyenablereflexiveself-understandingatadeeplevel;itjustmeansthat, 
• 
Ifthelearningandreasoningalgorithmsaresmartenough,therearenoobstaclestoveryhighlevelsofreflectiveself-understanding 

• 
Theamountofintelligenceneededonthepartofthelearningandreasoningal­gorithms to achieve modest levels of reflexive self-understanding, is not neces­sarilythathigh(becausetheAtomspacedesigndoesn’tplaceobstaclesintheway 


of conceptually simple problems of self-understanding being actually simple inpractice) 
Thissuggestsitmaybeplausibletoimplementavirtuouscycleoftheform: Abitofreflexiveself-understandingmakesthesystemabitsmarter,whichenablesittoachieveabitmorereflexiveself-understanding,etc. 
4.3.11 ModelingandUnderstandingofOtherMinds 
Humanunderstandingofother mindsappearsto bea combinationof multiple factors,including(uncertain)logicalmodelingofotherminds,empathicsynchrony,andinternalsimulationofotherminds. Hyperonshouldbeabletodoallthesetricks(seecommentsonemotionbelow),andinthecaseofsimulationshouldbeabletosignificantlyout-dohumansinsomeways.
A Hyperon instance can create other Hyperon instances specifically intended to modelspecificotherminds,andtrainandtunethemaccordingly. AlreadyusingLLMswecanmakeaninteresting,thoughnotfullyaccurate,”textualtwin”ofaspecifichumanbeing by fine-tuning an LLM on textual data they have produced. Emulating the faceandvoiceofahumanwitheerieaccuracyisalsopossiblewithcurrentdeepneuralnettechnology. WhathappenswhenwetightlyconnectthesenetworkswithanAtomspacerepresenting the knowledge and personality of a particular person? The TWIN Proto­col project is moving in this direction with the goal of making commercial productswithpracticalutility;howeverthesameapproachcouldpotentiallybeveryvaluableforenabling a Hyperon instance to make inferences about what specific other minds aredoing.
Andthenextstep,ofcourse,istocarryoutinferentialgeneralizationbasedontheseindividual-mind-modelingAtomspaces. Inthisway,itseemsHyperonsystemsmaybeable to more than compensate for their likely shortcomings (relative to human stan­dards)inemotionalsynchronywithhumans. AndwhenitcomestoHyperoninstancesmodeling each other, it seems clear their ability to construct approximate simulationsofeachotherwillservetheminextremelygoodstead. 

4.4 WhatIsItLiketoBeaHyperon? 
WenextconsiderafewcoreaspectsofhumanmindthatarenotexplicitlycalledoutaskeyaspectsoftheStandardModelofMind,but areconsideredintheStandardModelinvariousways,andcommonsensicallyappearkeytohuman-likegeneralintelligence. 
Theseaspectsleanalittlefurthertowardtheexperientialandsubjectiveaspectsofgen­eralintelligence –whatisitliketobeaHyperon? 
4.4.1 World Modeling 
The”worldmodel”ofanAGIsystemdoesnothavetobeadistinctcomponentasitis
e.g. in some robot control systems, it can be implicit across a variety of the system’sknowledgestores.
However, implicit world models can still vary widely and can be more or less so­phisticated and more or less useful. It is clear for instance that LLMs have a badlyinsufficientworld modelexcept insomeparticular cases; the rootcausehere seems tobethattheirknowledgeisoverlyparticularized,consistingmainlyofavastnumberofspecial cases. They do have some implicit abstractions in their knowledge, but theirability to adaptively deploy these abstractions is relatively minimal compared to theirabilitytofindandmorphappropriateparticularities.
A Hyperon system’s world model, to some extent, consists of the abstractions ithas learned from particular cases via methods like PLN and concept creation. The learning of explicit causal relationships is an important part of this. RL type methodsalsocanplayanimportantroleinlearningcausalrelationships,oftenofamoreconcretecharacter,butalsosubjecttoinferentialabstraction.
Computational systems also possess capabilities for world modeling not open tobiological brains. For instance, a Hyperon instance can model.a physical system byexplicitly running a physics engine; it can model acomputer network that’s part of itsinfrastructure by explicitly running a network simulation, etc. It can tune the parame­ters of these simulations to match its abstract understanding, and/or run these simula­tions undervarious conditionstolearnnewpotentiallyrelevant abstractions, etc. Thisillustratestheapproachwherein,whileHyperon’scorecognitivearchitectureistoasig­nificant degree inspired by (human) cognitive science, fundamentally (until we get toOpenCog Tachyon anyway) it is a digital-computational system and our inclination istoallowittoleveragewhateveradvantagesitsdigitalunderpinningsallow. 
4.4.2 Emotion 
JoschaBach’sMicroPsimodelofhuman-likeintelligence[Bac09](depictedroughlyinFigures 
18 
and 
19), 
drawing 
on 
Dietrich 
Dorner’s 
earlier 
Psi 
model 
[Dor02] 
groundsthecommonhumanemotionsintermsofparametersofcognitivesubsystemsconcernedwithaction,perceptionandmemory. CaiZhenhua’s2011PhDthesis[CGZ+11]explored 
the implementation of this model in OpenCog Classic, in the context of simple vir­tual agentsexploringa 3Dsimulationworld. Wehave also connected this model withScherer’sComponent-ProcessModelofemotion[Sch09],inthecontextofguidingim­
plementationofemotionmodelsforhumanoidrobotsandavatars[DG23]

Whileinsomewayscrudeandoversimplified,webelievethislineofdevelopment 
• 
Adequatelyexplainstheconnectionbetweenemotionsandotheraspectsofacog­nitivesystem 

• 
Gives a way to supply AGI systems with rough analogues of standard humanemotions(whichwillonlysometimesbesomethingone wantstodo,dependingonwhatkindofsystemoneisbuilding) 

• 
Gives a way to think systematically about AGI emotions that may differ in sub­stantialwaysfromthestandardhumanemotions 



4.4.3 Creativity 
Creativity in a complex cognitive system arises from a great variety of sources. Go­ertzel’sbookFromComplexity to Creativity [Goe97]analyzestherootsofcreativityin 
termsofunderlyingdynamicssuchas 
• 
Varyingonindividualformsthathavebeenperceivedbefore(”mutation”inevo­lutionarylearningparlance) 

• 
Combiningaspectsofformsthathavebeenseenbefore(”crossover”) 

• 
Complex,chaoticself-organizationamonginteractingelements(”self-organizingemergence”) 


Theeffectiveimplementationofeachofthesecaninvolveafairamountofsubtlety,however. LLMs and other current generative AI models achieve their limited degreeofcreativitybyvaryingandcombiningsurface-levelpatternsobservedintheirtrainingdata. Theirlimitationsarenot, itseems,mainlyduetolimitationsoftheoperationsofmutationandcombinationbutratherduetothelackofeasilymanipulableabstractionsinthesesystems. Varyingandcombininginamorefundamentallycreativewaywouldrequiremoreabstractrepresentations–whatDouglasHofstaderwouldhavecalledmoreinventive and abstraction-savvy ”knob creation” rather than ”knob-twiddling” of ad­justablefeaturesdefinedatthesurfacelevel[Hof95].
Creativity in CogPrime, in an art, literature, mathematics, science, or social or self analysis context, will be a combination of multiple methods including evolution­ary learning, uncertain inference, probabilistic synthesis and autopoietic ”Cogistry”rewrite-rulenetworks. Creativitywillbeintrinsicallyemotion-driven,accordingtotheunderpinning of emotion in parameters of perception, action and memory articulatedin the Psi model. But above all creativity will, when effective, be heavily guided byappropriately abstracted representation of the diverse knowledge content used as rawmaterialfornewcreations. 
4.4.4 Consciousness 
”Consciousness” is a massively overloaded term, and can mean numerous things in­cludinge.g. 
• 
Explicit world and self awareness of the sort that we seem to have while awakebutnotwhiledeeplyasleeporunderanesthesia 

• 
The sort of reflective self-understanding that people have much more of than dogs,dogshavemoreofthanworms,adultshavemuchmoreofthanbabies,etc. 

• 
Qualia–theraw,subjectivefeelingofbeingawareBasicawareness/responsivenesstotheenvironmentofthesortthatarguablyeveryelementaryparticledisplays 


There are debates about whether digital computer systems can ever be consciousin the sense that people are, which are difficult to resolve scientifically given that theconnection between conscious experience and physical/biological activity is not wellscientifically understood yet even in humans. Ben Goertzel has proposed using brain­brainandbrain-computerinterfacingtoinvestigatetheseissuesinnewways[Goe15a].
Goertzel’s 
paper 
[Goe14a] 
explores 
issues 
regarding 
consciousness 
and 
the 
struc­
tures and dynamics in human brains and AGI systems. From a practical perspective,however, there are so many unknowns here that the nitty-gritty work of building AGIsystemstendstosetasidequestionsofconsciousexperience,andinsteadworkintermsof”neuralandcognitivecorrelatesofconsciousness.”
Intheseterms,thekeycorrelateof”reflexiveself-awareconsciousness” –thekind of consciousness that is there when awake but not deep asleep – in Hyperon systemssystemsistheAttentionalFocus. ThecontentsanddynamicsoftheAttentionalFocusare likelythe primary determinants of aHyperon system’s”state of consciousness” in thecommonsenseinterpretation. 

4.5 Hyperon as an Infrastructure for Alternate Cognitive Archi­tectures 
Whilethemain thrustof Hyperon-based AGI R&D, asbeingpursuedby theteamde­veloping the Hyperon infrastructure itself, is centered in the vicinity of the CogPrimecognitivearchitecturereviewedabove,thereisalsoanintentionforHyperontobeusefulforexperimentationwithalternativeAGIparadigmsandarchitectures.
Of course, one can’t expect the same infrastructure to be useful for every possibleAGI approach; however, to the extent that multiple AGI approaches can be pursuedwithinthesameinfrastructureandtoolset,itmaybeeasiertocomparetheirresultsandstrengthsandweaknesses,andtocombinemodules,algorithmsorrepresentationsthathavebroadutilitybeyondoneparticularAGIapproach. Alongtheselines,forinstance, 
• 
There have been discussions with members of the NARS community about thepotentialbenefitsofMeTTaandHyperonasanimplementationfabricforaver­sionoftheNARSreasoningsystemandcognitivearchitecture 

• 
There have been discussions about use of Hyperon to implement highly bio­logically realistic neural networks, perhaps using nonlinear-dynamical neurons(based onHodgkin-Huxley equationorIzhikevich’s chaotic neuron) and/or per­hapsusingAlexOrorbia’spredictivecodingbasedalternativetobackpropagation[OK22]and/orYiZeng’sBrainCogarchitecture[ZZZ+22] 



4.5.1 Hyperon as an Infrastructure for SISTER 
AsanotherpotentialexampleoftheuseofHyperontoimplementandexplorealternatecognitivearchitectures,DeborahDuong,CTOofRejuveNetwork: 
"The SISTER (Symbolic Interactionist Simulation of Trade and Emergent Roles) framework [Duo04] 
that I’ve been working on for quite some time now provides a promising approach for integrating LLMs with symbolic reasoning systems in a neurosymbolic architecture. 
"The key advantage of SISTER is its ability to model the social emergence of symbols and meaning from lower-level dynamics, akin to how concepts arise through human interaction and collective sensemaking. As such, SISTER can generate the implicit representations that come before explicit symbolic formulations. The autonomous agents in SISTER self-organize to create shared signaling systems and conceptual spaces, which capture new abstractions as they emerge. 
"SISTER provides selective pressure for communications to be both compact, as they are resource constrained, and free of context enough so that receivers with different contexts can still understand them, and composable so that things never seen before can be expressed.. It so happens that compactness and being free of contexts and composability leads to the creation of mathematics and symbol processing, Thus using SISTER for neurosymbolic knowledge extraction has an advantage over methods that pull symbols from internal neural states without selection for compactness, context freeness and composition. 
"Once these implicit representations are externalized, probabilistic logic networks like Hyperon can then translate them into explicit logical constructs understandable to humans. This allows for an expansion of knowledge through induction of new concepts, deduction through logical reasoning, and abduction of new hypotheses. In essence, SISTER provides a pathway for bootstrapping the neurosymbolic capabilities of Hyperon through emergent symbol grounding, complementing Hyperon’s strengths." 

4.6 HyperonasaFoundationforSuperintelligence 
Emulatinghuman-likecognitivearchitectureatacertainlevelofabstractionis,webe­lieve, a viablepathtoward creating human-level AGI – even if the underlying compo­nentsofthearchitecturedon’tinvolvesimulationofbiologicalstructuresanddynamicsat the realistic or notional level. However, we have already seen above that, in manycases, the wayHyperon will address concrete problems within its roughly human-likecognitive architecture is going to be very different from how humans address prob­lems. Humanscan’twiretheirbrainsintoJuliaSymbolicsandtheycan’tsystematicallypattern-mine on their whole knowledge-bases and they can’t map their learned proce­duresintodeclarativeformusingsimpleformaltransformations–Hyperoncandothesethingsandthere’snoreasonitshouldn’t,solongasitcandosoinwaysthatbuildtowardratherthandetractfromitsfundamentalself-andworld-understanding.
These same non-human aspects of Hyperon are likely to be key to the transitionof Hyperon from human-level to radically superhuman general intelligence – which we believe is a near-inevitability if we do succeed at getting it to human-level generalintelligence. Hyperonwillbeabletointrospectandanalyzeoverits whole knowledgebase, and use this understanding to explicitly revise all its knowledge and rewrite orredesignallitscognitiveprocedures. Thisisalevelofself-understandingandcognitivesophistication totally inaccessible within the human brain architecture, and palpablyleads on to various forms of superhuman intelligence that are frankly hard for us tograpplewithevenconceptually.
TheGOLEMmeta-architecturedepictedinFigure20providesoneverysimplifiedway tothinkabout thestructureanddynamicsofAGIsthatare ableto rethinkandre­vise their own sourcecode. In this approach there is a "base operating program" AGIsystem that carries out various actions in the world, and then a meta-level optimiza­tion system that searches the space of possible architectures for this base AGI systemin accordance with high-level goals, and modifies the code of this base-level systemaccordingly – doing systematic tests before updating the code of the base system, andalsowiththepossibilityofrollingbackifthingsdon’twork. Thissortofapproachcouldbetakeninarigidwaythatattemptstomaintaincertaininitiallyfixedgoalsthroughalltheself-modifications;or,moreinterestingly,itcouldbeutilizedinamoreopen-endedmannerinwhichthetop-levelgoalsareallowedtomodifyviaexperience,butareusu­allychangedonlyatasignificantlyslowerpacerelativetothechangesinthebaseAGIsystem. Thedynamicsofgoalevolutionasrelatedtooverallcognitiveevolutioninthissortofsystemisnotatallwellunderstoodatthemoment.
AsBenGoertzelnotes, 

"Some theorists have argued that strongly self-modifying systems like ’GOLEM with a Hyperon initial base and ability to update its goals’ would be likely to converge into pathological goal systems such as megalomania, wireheading or total self-centeredness – but there seems no rational reason to believe this and my own intuition is quite otherwise, I suspect if there is a tendency of this sort of system to converge to some sort of attractor it’s more likely one with a compassionate and beneficial nature. But we are definitely here in a domain where current science barely points us in some directions to look, and our thinking is necessarily guided more by intuition than by rigorous results." 
The 
”General 
Theory 
of 
General 
Intelligence"articulated 
in 
[Goe21d]gives 
somereasonabletoolsfor thinkingabout thespectrumofsystemsbetweensomething like a”Hyperon 1.0” and a mature GOLEM system. GTGI’s formulation of cognitive algo­rithmsintermsofGaloisconnectionsleveragesarepresentationofthesecognitiveal­gorithmsasspecialcasesofa"Combinatory-Operation-BasedFunctionOptimization"(COFO) 
process 
as 
roughly 
depicted 
in 
Figure 
21. 
This sort of process can be car­ried out with great precision if one has closer-to-infinite compute resources, and thenin various more or less heuristicways if one has currently-realistic compute resources 
– where human-like intelligence then corresponds to a particular network of heuris­ticsthatareespeciallyvaluableinhistoricallyhuman-relevantenvironments. Lookingat how COFO works when one has tremendously but not insanely more compute re­sourcesis interestingandcouldgive insights intopotential continuous pathsof evolu­tionbetweenHCAGIandradicalASI.ThisrelatestothethoughtsinthearticleRobust Cognitive Strategies for Resource-Rich Minds [Goe], 
which 
explores 
cognitive 
strate­
gieslike 
• 
Statisticallysamplingfromneighboringpossibleworldsinthemultiverse. 

• 
Maintainingahistoryofyourpriorversions,assessingtheirviewofyourcurrentselfandrollingbacknowandthenwhenappropriate 


that may well be possible for physically-feasible post-Singularity superminds but arebeyondthescopeofbasicHCAGIcognitiveheuristics. 

Figure 21: Schematic diagram of the Combinatory-Operation-Based Function Optimization (COFO) process for optimizing functions via searching spaces of combinations. COFO pro­cesses follow the general template of a Discrete Decision System that chooses actions aimed at achieving goals; but the actions they are concerned with are actions of providing an argument to be evaluated by a partially-unknown function that is the subject of optimization activity. The core algorithms involved in AGI systems like OpenCog can be expressed as cases of the COFO process. 
Thereareofcoursemanystepstogettothissortofplaceinreality–weareallwell awarethatcurrentpre-alphaHyperonsystemslackmanyaspectsofgeneralintelligenceobserved in ordinary one year old children. However, it is also important to have asclear as possible of an understanding of the broader potentials of the architecture weareworkingwith. 
4.6.1 Hyperon and Universal AI Methods 
While it’s likely superintelligence will break all human theoretical and intuitive con­ceptsinmanyways,italsoseemslikelythatourmathematicaltheoriesmayencompassaspectsofsuperintelligencethatgobeyondoureverydayintuitions. ThemathematicaltheoryofAGIcontainsapproacheslikeMarcusHutter’sAIXIandJuergenSchmidhu­ber’sGodelMachinethatareunrealizableusingcurrentlyrealisticcomputeresources,but may capture some aspectsofhow radically superhuman minds may think. AlexeyPotapovhascommentedontherelationshipbetweenHyperonandthesemathematicalapproachestogeneralintelligenceasfollows: 
"Hyperon as a platform doesn’t contain implementations of universal induction or AIXI and doesn’t even account for information-theoretic criteria in its core design principles. Nevertheless, its development was motivated by the information-theoretic approach to AGI as well. 
"Pattern matching is a basic operation in Hyperon, and all algorithms are represented in the form of such patterns as well. This makes Hyperon friendly for working with algorithmic regularities, which are represented in a declarative composable form. One particular Hyperon module is Pattern Miner, which uses information-theoretic surprisingness criteria. Thus, while Hyperon doesn’t insist on implementing AGI systems on top of universal induction, it facilitates the use of elements of algorithmic information theory. 
"Turing-complete probabilistic programming languages (PPLs) can be considered as a practical implementation of universal induction and related theories. Indeed, it is enough to write a probabilistic program, which generates all other programs, and condition it on the observations to get universal induction approximated by a specific sampling or inference algorithm implemented in the PPL interpreter. Efficient inference in PPLs corresponds to efficient universal induction. But it might not be achievable in AGI settings without knowledge-based declarative reasoning, meta-heuristic search (e.g., genetic programming), etc. No programming language or framework provides tools for implementing such inference control over universal probabilistic models, while it is one of the running use cases for Hyperon. 
"Some models in the universal artificial intelligence domain are heavily based on logic. Godel Machine is one such example. Some recent variations of AIXI also suppose extraction of ”laws of nature” in a declarative form amenable for reasoning. Implementing Godel Machine with its self-rewritable axiom systems in Hyperon might be easier than in any other framework. 
"Thus, while Hyperon is not built around universal induction and AIXI, it can be useful for experimenting with their different extensions going far 
beyond basic models, and possibly for developing a full-fledged solution on their basis." AsBenGoertzelnotes,"In 2008 when I first met Nil Geisweiller, who has become the lead AI developer behind PLN and metagraph pattern mining and a number of other aspects of Hyperon AI, and described my ideas about AGI design to him, he said he thought it was essentially an approximative Godel Machine (referring to Juergen Schmidhuber’s theoretical idealized AGI system that, loosely speaking, carries out actions and self-modifications based on what it can formally prove is most likely to work out.). I did agree with him, but I also felt of course that this was sort of faint praise of my elaborate cognitive architecture thinking. There are much simpler approximations to the Godel Machine, but finding an approximation that will work well for the tasks humans care about, running on reasonable available resources, is basically just another way of phrasing the whole problem of cognitive architecture design. "A few years later I articulated what I now call the ’Mind-world Correspondence Principle’ – i.e. that the way to make a system that has a reasonable degree of general intelligence relative to a certain set of goals in a certain set of environments, is to embed in the structure of this system a set of patterns that are closely homomorphic to patterns in the environments relative to the goals. So for instance, if an environment is hierarchical and the system’s goals tend to break down at least approximately into subgoals pertaining to different levels of the hierarchy, then to efficiently deal with this situation, the mental architecture of a cognitive system should probably have distinct hierarchical patterning as well. 
"A generally intelligent meta-system like GOLEM would be able to identify the patterns in its current environment /goals and goals and then modify its operating program to better reflect these patterns. Less thoroughgoingly self-modifying systems like human minds and cultures still do something similar to some extent, as they adapt and develop." 
Geisweiler still takes a Godel Machine related perspective on his Hyperon AGIwork: 
A Goedel Machine [Sch06] 
is an ideal, but realizable, self-rewriting system which only triggers rewrites that have been formally proven to improve the system. The difficulty comes from generating such proofs. Any long chain of reasoning, which such target theorems likely require, is extremely hard to come by. 
Inference control meta-learning may provide a way to remedy that. By recording and mining traces of past successful and unsuccessful inferences, inference control rules can be discovered and used to speed-up future reasoning by biasing the search towards inferences that have been deemed successful in the past. The problem however is that in order to learn to discriminate success versus failure, one needs to experience success, at least once. In the context of finding proofs of self-rewriting improvements, this may be difficult. 
Things can be done about that nonetheless. First, some rewrite may be sufficiently simple, like tuning some parameter, such that some proof could be found within some acceptable amount of time. In that manner, a corpus of increasingly difficult proofs could conceivably be built. Second, and that is a deeper point, some knowledge about inference control for self-writing improvements could be sufficiently general that it may be learned from solving problems that do not pertain to self-rewriting improvements. The extend to which this is true remains to be seen, but if that is the case, even a bit, then it would provide an effective way to kickstart a virtuous cycle of self-improvements, as by merely learning to solve problems in the world, the system would learn to solve problems within itself as well. 
4.6.2 Complexity,Self-OrganizationandEmergenceonthePathtoSuperintelli­gence 
TheinitialversionofHyperonisbeingdesignedwithgreatcare,andwehaveexploredmany of the underlying design principles and ideas here. However, if the project suc­ceeds, as Hyperon versions surpass the human level in general intelligence, they willfairlyrapidlybecomeself-designing,self-modifyingsystems–placingthemevenmoresquarelyinthedomainofcomplexitysciencethantheywillbeattheearlierpre-human­levelstage,when"only"theirknowledgeandcognitiveheuristicsarecomplexlyevolv­ingbuttheircorealgorithmsandmeta-representationswillbefixed.
This suggests that, alongside notions from Universal AI theory, notions from thescience of chaos and complexity may end up being valuable for understanding laterstagesofHyperon(self-)development. AsMattIkle’ notes, 
"Artificial General Intelligence (AGI) research is riddled with many large foundational and definitional questions. What are intelligence, consciousness, and life, after all? How did the first single cell organism form? How can one create ”something from nothing”? How can one take silicon, alter its electrical properties, add electricity and a fair bit of programming, and end up with AGI? 
"Partial answers to these questions may lie in the large class of ”chaos-theory” related disciplines such as nonlinear phenomena, self-similarity, fractals, complex dynamical systems, self-organizing maps, self-modifying systems, phase transitions, and emergent phenomena. 
"The importance of such nonlinear phenomena for creating AGI appears to be born out in current neuroscience research. In a recent week-long neuroscience experiment (XXhttps://www.ncbi.nlm.nih.gov/pmc/articles/PMC10081438/), human EEG dynamics were described as 
"patternsof”punctuatedequilibrium”: periodswherenetworkswouldremaininstablestates that corresponded to behavior and were interrupted by transitory bursts that were difficult to predict, displayed chaotic characteristics, and coincided with behavioral transitions. Brain state statistics displayed power lawscharacteristicofcritical dynamics thatare a trait ofsystems where complexity emerges from simple and stable building blocks. These results indicate that the com­plex and flexible brain dynamics that underpin real-world behavior are an emergent property of mixtures of individual, stable networks with simple dynamics. 
"Such punctuated equilibrium activity patterns are remarkably similar to the strange attractors of the complex dynamical systems theory underpinning Hyperon. At first these attractors will pertain to knowledge gained by the system within the framework of human-supplied cognitive algorithms; then later they will pertain to the formation and modification of the system’s cognitive algorithms and low-level implementation code as well." 
Complex systems theory was also one of the main inspirations for the theory ofOpen-EndedIntelligencementionedabove,whichviewsgeneralintelligenceasaself­organizing process combining dynamics of individuation and self-transcendence. In the OEI perspective, reaching toward Universal Intelligence is something that generalintelligences do in an effort to exceed their limitations and self-transcend, and an ef­forttooutsmartconditionsthatthreatenorweakentheirindividuation. Understandingwhat happens as OEIs reach further and further toward universal intelligence in vari­ouswaysisimportant,butisonlyoneamongmanyinterestingaspectsofthecomplexself-organizing emergent dynamics of the evolving and overlapping intelligences thatcomprisethemostfascinatingpartsofourworld. Inthisview,thesuccessofasystemlikeHyperonasanOpen-EndedIntelligencewillcomeifthesystemsurvivesforarea­sonable period of time, and while doing so, transforms itself into a radically broaderand richer kind of system than anything its human creators or its initial version couldpossiblyhaveconceived. 


5 Hyperon’s Development Path 
Havingroughlydescribedwhatweareaimingtobuild,howdoweplantodoitorgani­zationally?
Thecruxofcourseis: Justdoit. WehaveadedicatedteambuildingHyperonright 

now, and we plan to keep going, and to speed up rather than slow down. A roughoverviewoftheintendeddevelopmentroadmapfortheimmediatelyupcomingphaseisgiveninFigure22.
However,thisdoesnotexhaustthestrategywehaveinmind;itwillbemoreeffec­tive, we feel, ifwecan bringinsignificant additionalhuman resources and insight viadevelopingarobustopensourcecommunityandstrongcommercializationefforts. 
5.1 Scaling Up the Hyperon Development Community 
BenGoertzelsummarizestheOpenCogproject’shistoryregardingdeveloperrelationsasfollows: ”The name ’OpenCog’was intended to indicate not only the creation of an open-source cognitive architecture (there are many of those of course), but the creation of an open collaborative process among a large community aimed at refining this cognitive architecture toward ambitious goals like AGI at the human level and beyond, as well as toward a variety of practical applications. 
However, up till now at least we have pretty much failed at the ’large community’ part. We have done some interesting engineering and research work, have used OpenCog on the back end of a few practical applications, and have pulled in a few brilliant developers from the open source world ... but we have not yet gotten a really sizable active open source community going. I think this has been for a number of reasons – OpenCog Classic was never that easy to use in a practical sense, we didn’t have simple and accessible wizzy demos for newbie developers to build on, and of course the pursuit of AGI was just not a very popular thing until recently. It’s a whole new era now and AGI is far more interesting to a larger body of developers, so I think we have a strong chance to do with Hyperon some of the things we failed to do with OpenCog Classic, in the development-community domain as well as in the AGI R&D domain. But to do this, even in the current climate, we will need to pay sufficient attention to usability and to having easily demonstrable, exciting interim products for devs to play with – both of which are things that take edffort, somewhat distinct from the specific effort needed to simply use Hyperon for AGI R&D among a team of dedicated experts.” 
So far, OpenCog Hyperon has primarily been the work of a small group of devel­opersassociated with SingularityNETand True AGI. Thework has franklybeencon­ductedinasomewhatinsularmanner,althoughtheresultingcodehasbeenmadeopen source. 
However, we have a definite planto open thingsupdevelopment-community-wiseas well as code-wise. The current development roadmap aims for an alpha version ofthe Hyperon system – chief components being the MeTTa interpreter and Distributed Atomspace –aroundtheendofQ12024. Uponthisreleasewewillbeginasignificantoutreach initiative aimed at building a sizable active Hyperon developer community.GiventhecurrententhusiasmforAGI,weexpectthiswillbealesschallengingendeavorthanithasbeenOpenCoghistorically. However,wedon’texpectitwillnecessarilybeentirelyeasy,giventhatsomuchoftherecententhusiasmforAGIhasbeenspecificallydirectedtowardLLMsratherthanmoreheterogeneouscognitivearchitectures. 

5.2 Potential Early Demonstrations and Applications 
To accompany the alpha release we are working on a few practical demonstrations oftheearlyHyperoncodebaseaswell. Someideasundercurrentconsiderationinclude: 
• 
AMinecraft-playingassistantthatisbuiltonHyperonandusesprogramsynthe­sis. 

• 
Addition of a rewritable active memory to large language models, which we currently use to control dialogue systems behind humanoid robots like Grace,Sophia,andDesdemona. 

• 
AHyperon-basedframeworkforsymboliccontrolofgenerativeAI,particularlyfor imagegeneration,enablinge.g. theflexiblecombinationmultiplestabledif­fusionmodelstogeneratenovelstructures. 

• 
Use of PLN in the Rejuve project, to replace the Bayes Network currently usedtoestimatebiologicalagebasedonvariousattributesofanindividual 


Alongsidetheserelativelystraightforwardapplications, weare also experimentingwithemploying PLNfor knowledgediscovery inlongevity research. Inthe context ofthe Rejuve Biotech project, another SingularityNET initiative, we have been studyinglong-livedfliesthathavealifespanfivetoeighttimeslongerthanregularflies. WehaveanalyzedtheirDNAandunderstood,tosomeextent,whytheylivelonger. Wearenow interested in applying transfer learning to determine which of these longevity factorscanbeextrapolatedtohumans. ThisisanexcitingusecaseforPLN,particularlyasthelimitedamountofdataavailabledoesnotlenditselftotypicalDLorMLalgorithmsinthemannertheyarenormallyappliedingenomics. 
• 
Lookingalittlefurtherforwardtowardsthemediumterm(approximatelythenextonetotwoyears),wehavetwoprimaryfocusareas. 

• 
Enhancinglargelanguagemodelswithneural-symbolicintegrationtocreatemoreintelligent chat systems. Specifically , as discussed above, we believe couplingHyperon with LLMs can help overcome the latter’s shortcomings in terms ofcomplexmulti-stepreasoningandfundamentalcreativity. 


Controlling a multitude of virtual agents in a video game world, which serves asan excellent testbed for self-modifying codebases. One likely target here is the use ofHyperontocontrolan ”Alifespecies” calledNeotericintheSophiaversemetaverse. 

5.3 Commercialization 
While Hyperon is an open-source project, integrated with decentralized infrastructuretoolsandcreatedwithaprimarymotiveofbringingbeneficialAGItotheworldforthegood of all sentient beings (or coming as close to this noble aspiration as possible!)...wedonotconsideranyofthiscontradictorytothepursuitofpracticalcommercialap­plicationsleveragingHyperon. Tothecontrary,wearewellawareofthelargerolethat commercial development has played in building out the great open software networksin the world today, e.g. the Linux operating system and the Internet itself. What is importantisthattheopen-sourcecommunityhasenoughvibrancyandenergytoitthatitoperatesin closecouplingwith commercial usersand developers, ratherthandevel­opment being entirely driven by the commercial world. In the modern tech economy,it has been the interplay between the commercial world and the pure R&D world thathasledtosomeofthemostamazingachievements.
Withthisinmind,wenotethatseveraloftheauthorsofthisdocumentareinvolved in a company, True AGI, whose core goal is to use Hyperon to meet the AI needs ofenterprises across various vertical markets. There is also a sister company Zarqa thataimstoenhanceLLMsusingHyperon,inanattempttoimprovecommercialChatGPT­like systems. Other commercial projects mentioned above in passing include RejuveBiotech, which utilizes Hyperon, among other AI tools, for genomic inference, andSophiaverse, which employs Hyperion for the operation of metaverse agents. These projects are all connected with the SingularityNET ecosystem but as Hyperon growsandexpandswefullyexpectittobeleveragedforcommercialapplicationbyavarietyofotherparties.
Wedorecognizethat,althoughcommercialprojectslikethesearevaluabletogen­erate funds for developers and machine time as well as to build the usable, scalableapplications that interface deep AI tools with peoples’ everyday lives, they also come withcomplexchallenges.
Therearetechnicalanddesignchallenges. AsRobertWerko,TrueAGICOO,points out, "For commercial development one has to worry about a number of things that are less critical for a research software system, including more rigorous feature prioritization, product-market fit, gathering of user feedback, ease of user onboarding, quality of user experience, security and compliance, and so forth. Addressing these issues effectively can distract attention from achieving R&D goals; on the other hand, creating a robustly commerce-ready software framework can enhance one’s ability to efficiently and scalably do the R&D as well." 
And, perhaps even more difficult, there are also human and ethical challenges. A commercialcompany cannot be solely motivated by agoal like beneficial AGI, it willalways at least have a mixed motivation, of working toward the benefit of its ownersorshareholders. However,asBenGoertzelhasputit,"We believe that the ethical pursuit of commercial applications of early-stage AGI system can actually be to the benefit of these AGI system in a moral sense as well as in other dimensions. One of the key things an AGI needs to learn as it grows up is precisely how 
to balance its ethical intuitions with the practical activities undertaken by an agent in everyday life in order to get real things done.” 
Initial exploration of commercialization avenues for Hyperon will be carried out,non-exclusively, in collaboration with a handful of SingularityNET ecosystem com­panies who have been experimenting with OpenCog approaches for some time now.Theseincludeanumberofinitiativesrelatedtohumanoidrobotsandavatars,includingHanson Robotics with the Sophia robot and others, Awakening Health with the Graceeldercare robot, and Jam Galaxy and Musaic with a line of AI-based music initiativesincludingDesdemonarock-starbot.
The Grace robot is currently controlled by a complex dialogue system involving acombination of general-purpose LLMs with custom prompts, specially trained trans­former neural nets, and use of the OpenCog Classic system for handling aspects ofsemanticsandmemory. WorkisunderwaytotransitionfromOpenCogClassictoHy­peron here. The convergence of various sensory inputs with language, cognition andaction that is needed for humanoid robots is a demanding but ideal use case for theAtomspace’sintegrativecapabilities.
AnewprojectcalledMindChildren,involvingroughlymeter-tallhumanoidrobots,isplanningtoleverageasoftwarearchitecturesimilartoGrace’sbutbasedonHyperonfromthestart,andwillfocusmoreheavilyonmovementandactionplanningandinter­actionwithphysicalobjects.
The Rejuve Biotech and Rejuve Network projects are already leveraging Hyperonforaspectsofbioinformaticsdataanalytics(e.g. theFlybaseontologyhasbeenusedasan initial test case for the Distributed Atomspace, partlydue to its value for analyzinggenomicsdatafromlong-livedfruitfliesforRejuveBiotech). AsRejuveBiotech’sAIleadMichaelDuncannotes, 
There are a number of clear reasons why bio-AI needs more than LLMs: 
• 
Existing biases in research literature (e.g. overrepresentation of a small proportion of human genes and other similar biases; but also more general constraints of existing scientific paradigms) translates into biased training data. Basically this means LLMs keep recycling our assumptions back to us rather than guiding us in breaking fundamentally new ground 

– which is clearly needed given how little we understand about biological systems like human bodies to date. 

• 
Lack of ability to construct problem relevant numerical simulations. Answering questions and identifying patterns is only part of the story where bio-AI is concerned, it’s also necessary to design and run simulations, which involves complex multi-step reasoning of the sort LLMs are bad 

at. 

• 
The well known hallucination problem 

• 
LLMs lack the critical intuitions that can only be provided by grounding of linguistic biological concepts in biological realities – such as lab equipment and datasets 



5.4 AchievingBeneficialAGI 
The potential risks and benefits of AGI have become ahighly current and contentioustopic since the launch of ChatGPT. Many of us involved with the Hyperon project,however, have been thinking deeply about these topics for decades, and this thinkinghas infused itself deeply into the system architecture in ways that go far beyond thegenerallyshallowconsiderationsoneseesinpopularmedia.
BenGoertzelsummarizessomeofhisownviewsrelatedtoAGIethics,whichhave beencriticalforshapingvariousaspectsoftheHyperonproject,asfollows: 
The various contributors to Hyperon hold a diversity of views on issues related to AGI ethics; there is no rigid ”party line.” However, a few core hypotheses held by a substantial number of early Hyperon contributors including myself, and thus to some measure underlying the ”initial Hyperon approach” to AGI ethics are as follows: 
• 
There are unlikely to be strong guarantees regarding the future consequences of any technology as radical in its nature and broad in its utility as AGI 

• 
There are unlikely to be strong guaranteed regarding the future consequences of nanotechnology, biotechnology, brain-computer interfacing and a variety of other technologies under current active development around the planet (quite separately from the intersection of these technologies with AGI, which is also a significant point)? 

• 
It seems not plausible that humanity will pause or drastically slow down development of AGI or other advanced technologies, for multiple reasons: 

e.g. they provide obvious short-term economic and human benefit, and any nation that chose to slow them down would rapidly find itself at dramatic economic and military disadvantage to other nations that didn’t make this choice. 

• 
There is no empirical or logical reason to believe that negative outcomes from the advent of human-level or superhuman AGI are highly likely (argument by reference to Hollywood movies should not be considered compelling; 

and arguments like that of Nick Bostrom in Superintelligence are barely more so, as Ben Goertzel has argued in detail some years ago [Goe15b].) 


• 
Just as human mind/brains are very unlikely to be the most intelligent possible systems realizable using known physics, similarly they are very unlikely to be the most compassionate possible systems realizable. ”Artificial supercompassion” is likely just as possible as ”artificial superintelligence.” 

• 
The various dynamics that make human beings dangerous to each other (and often increasingly dangerous as they achieve more power) are not all necessary aspects of human-level intelligence. Some of them – e.g. anger, jealousy, egocentricity – may be, in large, part, just the way humans happened to evolve. 

• 
It seems likely possible to create AGI cognitive architectures that are strongly oriented toward compassionate, stably ethical treatment of other sentient beings 

• 
It seems intuitive that putting early-stage AGI systems to work doing compassionate and beneficial things (e.g. healthcare, education, open science and art) will bias these AGI systems’ minds toward compassionate attitudes toward humans and other sentient beings 

• 
On the whole, the likelihood of positive ethical outcomes appear lower if the first powerful AGIs are controlled by a small group of individuals 

(e.g. the leadership of one nation or corporation), rather than by a broader swath of humanity. (This is in part just the maxim that among humans ”power corrupts, and absolute power corrupts absolutely.”). From this derives the strong value of decentralized infrastructure for AGI, if deployed and utilized correctly (such as e.g. that being developed by SingularityNET and its ecosystem projects like NuNet and Hypercycle) 

• 
The particulars of current standard human ethical systems, while they may not be natural to AGI systems in the same sense that they’re natural to humans, will not be particularly hard for human-level AGIs to master and cope with ... in fact current LLMs, while far short of human-like AGI in various ways, are already quite good at predicting human ethical judgments 


AllthesepointsexceptthelatterhavebeenconsideredextensivelyinGoertzel’spubli­cationsfromprioryearsanddecades,e.g. 
[Goe16][Goe15b][GP12].
Thelatterpointhasbeencoveredinacouplerecent articlesreportingexperimentswithGPT4,LlamaandotherLLMs,specificallyexaminingtheirabilitytopredictethi­caldecisionsinvariousscenarios. WhatwefoundwasthatLLMsareincrediblyprofi­
cientatthistask,outperformingmostindividualsinpredictingwhathighlyethicalandbenevolenthumanswoulddo. AsBenGoertzelnotedinhisAGI-23talk,"These experiments led me to realize that the main issue we face as humans, ethics-wise, is not a lack of knowledge about what the morally right thing to do is, but rather our tendency to prioritize self-interest or tribal interests over ethical considerations. While LLMs lack agency and morality themselves, they possess the capacity to predict ethical decisions based on common human sense. Now, they can also generate plausible excuses for unethical actions, if you ask them to. And they still have some work to do, to be able to deal adequately with adversarial attempts to manipulate them to misunderstand situations and suggest or take unethical actions based on this misunderstanding. But in any case, the base knowledge of what default current human ethics says, is something that’s not going to be a problem for any AGI system that is able to effectively leverage LLMs as part of its cognitive process. "Overall, it is now clear that the hardest part of AGI ethics lies not in AI’s understanding of human ethics but rather in dealing with adversarial gamesmanship aimed at inducing misunderstanding, and balancing ethical knowledge with the pragmatic aspects of daily decision-making. Contrary to the beliefs many have expressed that human ethics is too complex and contradictory for formalization, LLMs have shown the ability to capture these nuances in their own unique way. 
"One conclusion from this is that in the development of goal-oriented cognitive architectures for AGI, employing LLMs as human ethics oracles can quite likely be very valuable. However, it will crucial to employ tools like PLN to verify LLM responses, otherwise adversarial attempts to manipulate them will severely undermine their reliability. " 
Inthecontextofthesecomments,itwouldseemthehybrid,multi-componentofHy­peronmaypossiblyturnouttobeamajorassetforAGIethics. OnecangiveaHyperonsystema”brainlobe”consistingofanLLMfine-tunedtoemulatehumancommonsenseethical judgments, and then when it considers an action for execution, it can use thislobetoassesstheethicalvalanceofthisactionaccordingtocommonhumanstandards.It can also use ethical positivity according to common human standards, as evaluatedviathislobe,asoneofitstop-levelgoals.
Asin human development, the inculcation of appropriate ethics and values in Hy­peronsystemswillbeaprocessandnotsomethingtobeachievedrigidlyonceandforall. Itwillbeaprocessof,amongmanyotherthings, 
• 
incorporatinghumanethicaljudgmentsappropriatelyintoHyperonsystem’sgoals 

• 
encouraging Hyperon systems to explore and develop their own values in thevicinityofbroaduniversalvalueslikecompassion,joy,growthandchoice 

• 
making sure that on balance the applications that early-stage Hyperon systemsarecarryingoutarepositiveonesthatshapeitsmindinbeneficialdirections,andhelppeopleintheirownqueststoguidetheirownmindsinpositivedirections 


There is much to be learned here, and the spirit and ethics of the groups of humanscarryingouttheworkinvolvedwillsurelybeamongthemostimportantfactors. 


6 Concluding Remarks 
It appears to us that we have an extraordinary opportunity in the next (let’s say) 3­10 years to achieve human-level AGI. While the exact timing is uncertain, it seems atleast plausible that building a large-scale Hyperon system and allowing it to learn viainteracting with it in a suitable variety of application areas could lead to human-levelgeneralintelligence.
Andaswehavereviewedabove,onethingwecanplausiblyteachaHyperonsystemto do is design and write software code. LLMs are already passable at this in simplecontexts; Hyperon is designed to augment this capability with deeper creativity andmorecapablemulti-stagereasoning. Oncewehaveasystemthatcandesignandwritecodewellenoughtoimproveuponitselfandwritesubsequentversions,weenterarealmthatcouldleadtoafull-onintelligenceexplosionandTechnologicalSingularity.
WhilewearenotyetatapointofhavinganAGIcapableofrapidlyself-modifyingitselftoward Singularity, nevertheless, Hyperondevelopment is currentlyat avery in­teresting stage. We have preliminary versions of a MeTTa interpreter and DistributedAtomspace, enabling experimentation and development. And as we’ve noted, alphaversionsofthesearecurrentlytentativelyscheduledfortheendofQ12024.
While the system’s scalability is still a work in progress, and comprehensive toolsand documentation are lacking, these are all on the roadmap and coming fairly soon.Upon launch of the alpha, we are extremely eager to involve more individuals in theopen-sourcecommunity,whethertheyareexperiencedAGIresearchersordedicatedAIorapplicationdevelopers. Thepotentialforrapidadvancementtowardtrue,beneficialAGIisenormous. 
HyperonandCogPrimearecomplexdesignsandfullyunderstandingthemisaworkinprogressforallofus. Ouraimherehasbeentooutlinethehighlights,andhopefullyto pique the reader’s interest in exploring more deeply, for example in the documents,videosandcodelinkedfromhttp//hyperon.opencog.org. 
