"use client"

import React, { useState } from "react";
import "../pages/simon_dev/style.css";
import FooterPage from "./FooterPage";
import Navbar from "./Navbar";
import InfoCentreHomePage from "./InfoCentreHomePage";

export default function SimonPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };


  return (
    <div className ="main">
<<<<<<< Updated upstream
       <Navbar/>       
=======

>>>>>>> Stashed changes
       
    <div className="content">
      <div className="section">
        <h3>Overview</h3>
        <p>
          It affects people of all ages. Although uncomfortable, blepharitis is{" "}
          not contagious and generally does not cause any{" "}
          permanent damage to eyesight. Blepharitis can't
          usually be cured, but the{" "}
          symptoms can be controlled with good eyelid hygiene.
          Blepharitis is a long-term (chronic) condition.
        </p>

        <p>
          Blepharitis can be classified according to anatomic location:{" "}
          anterior blepharitis affects the eyelid skin, base of
          the eyelashes and the eyelash follicles, and{" "}
          posterior blepharitis affects the meibomian glands and
          gland orifices. Blepharitis has traditionally been clinically subcategorized as{" "}
          staphylococcal,{" "}
          seborrheic,{" "}
          meibomian gland dysfunction (MGD), or a combination
          thereof.
        </p>

        <p>
          There is considerable overlap of symptoms of all types of blepharitis. Blepharitis
          frequently leads to associated ocular surface inflammation, including{" "}
          conjunctivitis, functional tear deficiency, and
          keratitis. Blepharitis may also exacerbate symptoms of coexisting ocular surface disease,
          including allergy and aqueous tear deficiency. The chronic nature of blepharitis, the
          uncertain etiology, and the frequent coexistence of ocular surface disease make
          blepharitis difficult to manage. In cases where a{" "}
          bacterial infection is the cause,{" "}
          medications may be prescribed along with eyelid hygiene.{" "}
          Nutritional supplements such as{" "}
          Omega 3 and{" "}
          flaxseed oil are also recommended.
        </p>
      </div>

      <div className="symptomCard">
        <h3>Symptoms of Blepharitis</h3>
        <div className="contentWrapper">
          <ol>
            <li><u>Itchy, sore and red eyelids that stick together</u></li>
            <li><u>Crusty or greasy eyelashes</u></li>
            <li><u>A burning, gritty sensation in your eyes</u></li>
            <li><u>Increased sensitivity to light (photophobia)</u></li>
            <li><u>Swollen eyelid margins</u></li>
            <li><u>Finding contact lenses uncomfortable to wear</u></li>
            <li><u>Abnormal eyelash growth or loss of eyelashes in severe cases</u></li>
            <li><u>Both eyes usually affected (one may be worse), symptoms worse in the morning</u></li>
          </ol>
          <div className="imagePlaceholder"><img src="#" alt="not workin" /></div>
        </div>
      </div>

      <p>
        Staphylococcal blepharitis is characterized by{" "}
        scaling, crusting, and{" "}
        erythema of the eyelid margin with{" "}
        collarette formation at the base of the cilia. Chronic
        inflammation may be punctuated by acute exacerbations that lead to the development of{" "}
        ulcerative blepharitis. Loss of eyelashes and corneal
        involvement, including punctate epithelial erosions,{" "}
        marginal infiltrates, and{" "}
        neovascularization, may occur.
      </p>

      <div className="section">
        <h3>Causes and Risks</h3>
        <h4>There are three main types of blepharitis:</h4>
        <div className="cardsContainer">
          <div className="card">
            <h4>Anterior Blepharitis</h4>
            <p>Inflammation affects the skin around the base of your eyelashes.</p>
          </div>
          <div className="card">
            <h4>Posterior Blepharitis</h4>
            <p>Inflammation affects your Meibomian glands.</p>
          </div>
          <div className="card">
            <h4>Mixed Blepharitis</h4>
            <p>A combination of both anterior and posterior blepharitis.</p>
          </div>
        </div>

        <p>
          Anterior blepharitis can be caused by either a reaction
          to Staphylococcus bacteria – these usually live
          harmlessly on the skin of many people, but for unknown reasons they can cause the eyelids
          to become inflamed, or seborrhoeic dermatitis – a skin
          condition that causes skin to become oily or flaky and sometimes irritate the eyelids,
          causing the Meibomian glands to block.
        </p>

        <p>
          Posterior blepharitis is caused by a problem with the{" "}
          Meibomian glands, where the glands get blocked by
          either debris, skin flakes or inflammation. Sometimes blockages in the Meibomian glands
          are associated with a skin condition called rosacea. If
          too much oily substance is being produced, this may be caused by{" "}
          seborrhoeic dermatitis.
        </p>

        <p>
          Mixed blepharitis, which is the most common, is caused
          by a combination of both anterior and posterior blepharitis.
        </p>

        <p>
          Blepharitis isn't contagious.
        </p>
      </div>

      <div className="section">
        <h3>Stats and Incidence</h3>
        <div className="textWithImage">
          <div className="floatingImage ">Image Placeholder 2</div>

          <p>
            Although blepharitis is one of the most common ocular
            disorders, epidemiological information on its incidence or prevalence within defined
            populations is lacking. One single-center study of 90 patients with chronic blepharitis
            noted that the mean age of patients was 50 years.
            Compared with patients with other forms of blepharitis, patients with{" "}
            staphylococcal blepharitis were found to be relatively
            younger (42 years old) and most were{" "}
            female (80%). A survey of a representative sample of
            U.S. adults (n = 5000) revealed that typical symptoms associated with blepharitis are
            quite common, and that{" "}
            younger people report more frequent symptoms than
            older individuals. In another study in the same report,{" "}
            ophthalmologists and optometrists reported blepharitis in
            37% and 47% of their patients, respectively.
          </p>

          <p>
            According to statistical data,{" "}
            Chronic Blepharitis has the highest incidence of eye
            diseases. In a survey conducted in the United States (USA),{" "}
            37% to 47% of patients seen by respondents were
            diagnosed with blepharitis. In 2014,{" "}
            blepharitis accounted for 700,000 patient visits in
            the USA. In the past, there has been considerable confusion over the pathophysiology,
            and thus the definition of blepharitis. Because of these uncertainties, an{" "}
            accurate assessment of prevalence and incidence has
            been difficult. The objective of this study was to review the literature to present
            information on the incidence and prevalence of chronic blepharitis worldwide, and to
            identify the best medical treatments and interventions. Based on the literature review,
            there are still{" "}
            information gaps regarding the best treatment for chronic
            blepharitis and dysfunction of Meibomian gland (DMG).
          </p>

          <p>
            In conclusion, it is imperative to create{" "}
            multi-centre randomized studies to better understand{" "}
            the best treatment for these diseases in order to
            ensure improved quality of life throughout the entire
            treatment.
          </p>
        </div>
      </div>

      <div className="section">
        <h3>Treatment</h3>
        <p>
          Blepharitis is usually a long-term condition. Most
          people experience repeated episodes, separated by
          periods without symptoms. It can't usually be cured, but
          a daily eyelid-cleaning routine can help{" "}
          control symptoms and{" "}
          prevent permanent scarring of the eyelid margins.
        </p>

        <div className="cardsContainer">
          <div className="card">
            <h4>Using a warm compress</h4>
            <p>To make the oil produced by the glands around your eyes more runny</p>
          </div>
          <div className="card">
            <h4>Gently massaging your eyelids</h4>
            <p>To push the oils out of the glands</p>
          </div>
          <div className="card">
            <h4>Cleaning your eyelids</h4>
            <p>To wipe away any excess oil and remove any crusts, bacteria, dust or grime that might have built up</p>
          </div>
        </div>

        <p>
          More severe cases may require antibiotics that are either{" "}
          applied directly to the eye/eyelid or{" "}
          taken as tablets.
        </p>

        <p>
          For posterior blepharitis, long-term oral{" "}
          tetracycline, minocycline, or doxycycline is more
          effective than topical antibiotics, especially for patients with{" "}
          rosacea. As little as{" "}
          one pill twice a week can maintain a relatively good
          therapeutic dose for long periods.
        </p>
      </div>

      <div className="section">
        <h3>
          References{" "}
          <span
            className="toggleBtn"
            onClick={toggleList}
            style={{ cursor: "pointer", transform: isOpen ? "rotate(90deg)" : "rotate(0deg)" }}
          >
            &gt;
          </span>
        </h3>
        <ol
          className="collapsibleList"
          style={{ display: isOpen ? "block" : "none" }}
        >
          <li>
            <u>
              <a href="https://www.aoa.org/Blepharitis.xml">Blepharitis - American Optometric Association</a>
            </u>
          </li>
          <li>
            <u>
              <a href="https://www.nhs.uk/conditions/Blepharitis/Pages/Introduction.aspx">Blepharitis - NHS Choices</a>
            </u>
          </li>
          <li>
            <u>
              <a href="https://pubmed.ncbi.nlm.nih.gov/19383269/">Department of Ophthalmology, George Washington University School of Medicine, Washington, DC, USA</a>
            </u>
          </li>
          <li>
            <u>
              <a href="https://www.aao.org/eyenet/article/managing-blepharitis-tried-true-new-approaches">Managing Blepharitis: Tried-and-True and New Approaches</a>
            </u>
          </li>
          <li>
            <u>
              <a href="https://www.journalijdr.com/chronic-blepharitis-review-incidence-prevalence-and-treatments">International Journal of Development Research</a>
            </u>
          </li>
        </ol>
      </div>

    </div>
     

    </div>

    
  );
}

