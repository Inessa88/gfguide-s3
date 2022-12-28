import './Home.css';

const Information = (props) =>{
    return(
        
       <div>
            
        <div className='div1'>
        <img className='photo1' src="https://images-django-test.s3.eu-central-1.amazonaws.com/images/Gluten-Free-Diet.png" alt="Main Picture" />
        <div className='common-info'>
            <h1>What is Celiac Disease?</h1>
           <p>Celiac disease is a serious autoimmune disease that occurs in genetically predisposed people where the ingestion of gluten leads to damage in the small intestine. It is estimated to affect 1 in 100 people worldwide, but only about 30% are properly diagnosed.</p>
            <h3>Long-Term Health Effects</h3>
            <p>
                People with celiac disease have a 2x greater risk of developing coronary artery disease, and a 4x greater risk of developing small bowel cancers.
                The treatment burden of celiac disease is comparable to end-stage renal disease, and the partner burden is comparable to caring for a patient with cancer.
                Untreated celiac disease can lead to the development of other autoimmune disorders like type 1 diabetes and multiple sclerosis (MS),
                and many other conditions, including dermatitis herpetiformis (an itchy skin rash), anemia, osteoporosis, infertility and miscarriage,
                neurological conditions like epilepsy and migraines, short stature, heart disease, and intestinal cancers.
            </p>
            <h3>Treatment</h3>
            <p>Currently, the only treatment for celiac disease is lifelong adherence to a strict gluten-free diet.
                People living gluten-free must avoid foods with wheat, rye, and barley, such as bread and beer.
                Ingesting small amounts of gluten, like crumbs from a cutting board or toaster, can trigger small intestine damage.
            </p>

            <h3>Gluten Free Diet</h3>
            <p>When you're first diagnosed with celiac disease, you'll be referred to a dietitian to help you adjust to your new diet without gluten.
                They can also ensure your diet is balanced and contains all the nutrients you need.If you have celiac disease, 
                you'll no longer be able to eat foods that contain any barley, rye or wheat, including farina, semolina, durum, cous cous and spelt.
                Even if you only eat a small amount of gluten, such as a spoonful of pasta, you may have very unpleasant intestinal symptoms. 
                If you keep eating gluten regularly, you'll also be at greater risk of developing complications,
                 as osteoporosis and some types of cancer in later life.
            </p>

        </div>
           
        </div>
            <div>
                <h3>Foods containing gluten</h3>
                <div className='container'>
                    <div className='grid-element1'>
                       <img className='photo2' src="https://images-django-test.s3.eu-central-1.amazonaws.com/images/3a92b421-b366-4b0a-917c-5d5a1d9c4788.jpeg" alt="Gluten containing foods" /> 
                    </div>
                    <div className='grid-element2'>
                        <p>If you have celiac disease, do not eat the following foods, unless they're labelled as gluten-free versions:</p>
                        <ul>
                            <li>bread</li>
                            <li>pasta</li>
                            <li>cereals</li>
                            <li>biscuits or crackers</li>
                            <li>cakes and pastries</li>
                            <li>pies</li>
                            <li>gravies and sauces</li>
                        </ul>
                        <p>It's important to always check the labels on the foods you buy. Many foods (particularly processed foods) include additives which contain gluten, such as malt flavouring and modified food starch.
                            Gluten may also be found in some non-food products, including lipstick, postage stamps and some medicines.
                            Cross-contamination can happen if gluten-free foods and foods that contain gluten are prepared together or served with the same utensils.</p>

                    </div>
                    
                    

                </div>
                
            </div>
            <div>
                <h3>Gluten-free foods</h3>
                <div className='container-two'>
                    <div>
                        <img className='photo-three' src="Gluten-Free-Foods-List.jpg" alt="Gluten-free foods" />
                    </div>
                    <div className='grid-element-three'>
                        <p>There are many different kinds of food which are naturally gluten-free:</p>
                        <ul>
                            <li>most dairy products, such as cheese, butter and milk</li>
                            <li>fruits and vegetables</li>
                            <li>meat and fish (although not breaded or battered)</li>
                            <li>potatoes</li>
                            <li>rice and rice noodles</li>
                            <li>gluten-free flours, including rice, corn, soy and potato flour</li>
                        </ul>

                    </div>
                    
                    


                </div>

                

            </div>
            <div>
                <h3>Gluten-Free labelling</h3>
                <div className='common-info'>
                    <p>When you’re living gluten-free, making sense of food labels can be a bit of a puzzle you must solve before you can feel confident putting that product in your cart and bringing it home to consume. We put together three tips for reading labels on packaged food products to help you figure out if they’re safe for you, or anyone in your household, avoiding gluten. </p>
                    <h4>Tip 1: Look for Third-Party Certification</h4>
                    <p>A product that carries a third-party certification is considered safe for gluten-free consumers. There are several gluten-free signs you need to look for:</p>
                </div>
                <img className='sign'src="gf-sign2.png" alt="GF Sign1" />
                <img className='sign'src="gf-sign1.jpg" alt="GF Sign2" />
                <img className='sign'src="gf-sign3.jpg" alt="GF Sign3" />
                <img className='sign'src="gf-sign4.png" alt="GF Sign4" />
                <img className='sign'src="gf-sign5.png" alt="GF Sign5" />
                <img className='sign'src="gf-sign6.png" alt="GF Sign6" />
                <img className='sign'src="gf-sign7.png" alt="GF Sign7" />
                <div className='common-info'>
                    <h4>Tip 2: Look for the words “gluten-free”</h4>
                    <p>If a packaged product is regulated by country's celiac assosiation and labeled "gluten-free", it is considered safe for gluten-free consumers. Though you might want to check that information before going abroad as these regulations differ from country to country.</p>
                    <h4>Tip 3: Read the Ingredient List</h4>
                    <p>For products that are not certified or labeled “gluten-free”, the best way to make sure you are eating or serving gluten-free packaged foods is to read the ingredient list.
                    An important thing to note about oats: Unless the words “gluten-free” or a gluten-free certification mark are on the oats packaging, oats may not be gluten-free. </p>
                    <h4>Confused About That “May Contain Wheat” Statement?</h4>
                    <p>Statements such as “may contain wheat” or “processed on equipment that handles wheat” are not relevant to the gluten-free status of a product that is certified or labeled gluten-free. These are voluntary statements that manufacturers may use to be transparent or to alert consumers who have wheat allergies – not gluten sensitivities.  
                    If a product is either labeled or certified gluten-free, these statements are not relevant to the gluten-free status of a product because that product would meet the standard for gluten-free. If the product is not certified or labeled gluten-free, the product may not be safe. If you aren’t sure, contact the manufacturer directly. They should be able to furnish you with the information you need to make safe food choices. </p>
                    

                </div>
                
            </div>

            <div>
                <h3>Celiac Friendly Dining Out</h3>
                <p>Here are some tips to make eating out as safe and comfortable as possible</p>
                <img className='tips' src="Dining-Out-Infographic.png" alt="Dining Out Instruction" />
            </div>
            
            
            <div>
                <h3>Travelling Gluten-Free</h3>
                <img className='photo1' src="https://images-django-test.s3.eu-central-1.amazonaws.com/images/pexels-monstera-7412090.jpg" alt="Gluten-Free traavelling" />
                <div className='common-info'>

                    <h4>Planning your trip</h4>
                    <ul>
                        <li>When you book, contact the tour/cruise operator to let them know that you will require gluten free meals</li>
                        <li>Some tour operators have a specific department that you need to contact about the provision of gluten free meals in your chosen hotel so do check this with them when making your booking.</li>
                        <li>When travelling independently, research the local food and whether it is suitable for a gluten free diet. Work out what foods you can rely on in an emergency.</li>
                        <li>Pack some emergency gluten free snacks in your suitcase – you never know when you may need them.</li>
                    </ul>
                    
                    
                    <h4> Travel insurance</h4>
                    <ul>
                        <li>Arrange travel insurance and inform the company that you have coeliac disease. Many insurers do not charge extra for covering someone with coeliac disease.</li>
                        <li>Shop around if you are unhappy with the quote.</li>
                        <li>As insurance policy cover can vary from company to company, you should always check the full details of your travel insurance policy carefully.</li>
                    </ul>

                    <h4>Transport</h4>
                    <ul>
                        <li>Ask for gluten free meals at the time of booking</li>
                        <li>Double check these arrangements before you leave and make yourself known to staff when you arrive.</li>
                        <li>Gluten free choices can be limited at some airports, train stations, motorway service stations and on ferries, so plan ahead and prepare food or take snacks for the journey.</li>
                        <li>Always make sure you have emergency snacks in case of delays or cancellations.</li>
                    </ul>
                    <h4>Taking food abroad</h4>
                    <ul>
                        <li>Check with your airline or tour operator whether sealed packs of gluten free products can be brought into the country you are visiting. They can sometimes also give you additional baggage allowance if you request it. Some countries are extremely strict on what plant based products you can bring in so it's best to check in advance.</li>
                        <li>If you require further reassurance, your GP can provide you with a letter explaining coeliac disease and why you need these products.</li>
                    </ul>

                    <h4>Hotels and restaurants</h4>
                    <ul>
                        <li>Book your accommodation and restaurants in advance, requesting gluten free meals at the same time.</li>
                        <li>Speak to the chef or front of house staff when you arrive to confirm that gluten free meals have been arranged.</li>
                        <li>Follow your instincts if you are unsure whether a dish is safe and speak to the chef again.</li>
                        <li>Although Western style buffets are increasingly found all over the world, ensure that the gluten free options are safe and not contaminated (for example, check for separate serving spoons).</li>
                    </ul>

                </div>
                
            </div>

            <div className='links'>
                <h4>Here you can find some very useful and interesting links and blogs of people with Celiac desease</h4>
                <a href="https://www.eatwithoutgluten.com/">Eat Without Gluten</a><br/>
                <a href="https://glutenfreedad.org/">GlutenFreeDad</a><br/>
                <a href="https://gfjmomma.wordpress.com/">Gluten Free Jewish Momma</a><br/>
                <a href="https://www.glutenfreegoddessrecipes.com/">Gluten-Free Goddess Recipes</a><br/>
                <a href="http://allergicgirl.blogspot.com/">Allergic Girl</a><br/>
            </div>

            

            

            

            

            






       
       </div>
    )
}

export default Information