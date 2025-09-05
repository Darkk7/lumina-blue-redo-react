"use client"

import React, { useState } from "react";
import "../pages/simon_dev/style.css";
import FooterPage from "./FooterPage";

export default function SimonPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="content">
      <div className="section">
        <h3>Overview</h3>
        <p>
          It affects people of all ages. Although uncomfortable, blepharitis is{" "}
          <span className="highlight">not contagious</span> and generally does not cause any{" "}
          <span className="highlight">permanent damage to eyesight</span>. Blepharitis can't
          usually be cured, but the{" "}
          <span className="highlight">symptoms can be controlled with good eyelid hygiene</span>.
          Blepharitis is a <span className="highlight">long-term (chronic) condition</span>.
        </p>

        <p>
          Blepharitis can be classified according to anatomic location:{" "}
          <span className="highlight">anterior blepharitis</span> affects the eyelid skin, base of
          the eyelashes and the eyelash follicles, and{" "}
          <span className="highlight">posterior blepharitis</span> affects the meibomian glands and
          gland orifices. Blepharitis has traditionally been clinically subcategorized as{" "}
          <span className="highlight">staphylococcal</span>,{" "}
          <span className="highlight">seborrheic</span>,{" "}
          <span className="highlight">meibomian gland dysfunction (MGD)</span>, or a combination
          thereof.
        </p>

        <p>
          There is considerable overlap of symptoms of all types of blepharitis. Blepharitis
          frequently leads to associated <span className="highlight">ocular surface inflammation</span>, including{" "}
          <span className="highlight">conjunctivitis</span>, functional tear deficiency, and
          keratitis. Blepharitis may also exacerbate symptoms of coexisting ocular surface disease,
          including allergy and aqueous tear deficiency. The chronic nature of blepharitis, the
          uncertain etiology, and the frequent coexistence of ocular surface disease make
          blepharitis difficult to manage. In cases where a{" "}
          <span className="highlight">bacterial infection</span> is the cause,{" "}
          <span className="highlight">medications</span> may be prescribed along with eyelid hygiene.{" "}
          <span className="highlight">Nutritional supplements</span> such as{" "}
          <span className="highlight">Omega 3</span> and{" "}
          <span className="highlight">flaxseed oil</span> are also recommended.
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
          <div className="imagePlaceholder">Image Placeholder</div>
        </div>
      </div>

      <p>
        Staphylococcal blepharitis is characterized by{" "}
        <span className="highlight">scaling</span>, <span className="highlight">crusting</span>, and{" "}
        <span className="highlight">erythema of the eyelid margin</span> with{" "}
        <span className="highlight">collarette formation</span> at the base of the cilia. Chronic
        inflammation may be punctuated by acute exacerbations that lead to the development of{" "}
        <span className="highlight">ulcerative blepharitis</span>. Loss of eyelashes and corneal
        involvement, including <span className="highlight">punctate epithelial erosions</span>,{" "}
        <span className="highlight">marginal infiltrates</span>, and{" "}
        <span className="highlight">neovascularization</span>, may occur.
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
          <span className="highlight">Anterior blepharitis</span> can be caused by either a reaction
          to <span className="highlight">Staphylococcus bacteria</span> – these usually live
          harmlessly on the skin of many people, but for unknown reasons they can cause the eyelids
          to become inflamed, or <span className="highlight">seborrhoeic dermatitis</span> – a skin
          condition that causes skin to become oily or flaky and sometimes irritate the eyelids,
          causing the <span className="highlight">Meibomian glands</span> to block.
        </p>

        <p>
          <span className="highlight">Posterior blepharitis</span> is caused by a problem with the{" "}
          <span className="highlight">Meibomian glands</span>, where the glands get blocked by
          either debris, skin flakes or inflammation. Sometimes blockages in the Meibomian glands
          are associated with a skin condition called <span className="highlight">rosacea</span>. If
          too much oily substance is being produced, this may be caused by{" "}
          <span className="highlight">seborrhoeic dermatitis</span>.
        </p>

        <p>
          <span className="highlight">Mixed blepharitis</span>, which is the most common, is caused
          by a combination of both anterior and posterior blepharitis.
        </p>

        <p>
          <span className="highlight">Blepharitis isn't contagious</span>.
        </p>
      </div>

      <div className="section">
        <h3>Stats and Incidence</h3>
        <div className="textWithImage">
          <div className="floatingImage">Image Placeholder 2</div>

          <p>
            Although <span className="highlight">blepharitis</span> is one of the most common ocular
            disorders, epidemiological information on its incidence or prevalence within defined
            populations is lacking. One single-center study of 90 patients with chronic blepharitis
            noted that the mean age of patients was <span className="highlight">50 years</span>.
            Compared with patients with other forms of blepharitis, patients with{" "}
            <span className="highlight">staphylococcal blepharitis</span> were found to be relatively
            younger (<span className="highlight">42 years old</span>) and most were{" "}
            <span className="highlight">female (80%)</span>. A survey of a representative sample of
            U.S. adults (n = 5000) revealed that typical symptoms associated with blepharitis are
            quite common, and that{" "}
            <span className="highlight">younger people report more frequent symptoms</span> than
            older individuals. In another study in the same report,{" "}
            <span className="highlight">ophthalmologists and optometrists reported blepharitis in
            37% and 47% of their patients</span>, respectively.
          </p>

          <p>
            According to statistical data,{" "}
            <span className="highlight">Chronic Blepharitis has the highest incidence of eye
            diseases</span>. In a survey conducted in the United States (USA),{" "}
            <span className="highlight">37% to 47% of patients</span> seen by respondents were
            diagnosed with blepharitis. In 2014,{" "}
            <span className="highlight">blepharitis accounted for 700,000 patient visits</span> in
            the USA. In the past, there has been considerable confusion over the pathophysiology,
            and thus the definition of blepharitis. Because of these uncertainties, an{" "}
            <span className="highlight">accurate assessment of prevalence and incidence</span> has
            been difficult. The objective of this study was to review the literature to present
            information on the incidence and prevalence of chronic blepharitis worldwide, and to
            identify the best medical treatments and interventions. Based on the literature review,
            there are still{" "}
            <span className="highlight">information gaps regarding the best treatment for chronic
            blepharitis</span> and dysfunction of Meibomian gland (DMG).
          </p>

          <p>
            In conclusion, it is imperative to create{" "}
            <span className="highlight">multi-centre randomized studies</span> to better understand{" "}
            <span className="highlight">the best treatment</span> for these diseases in order to
            ensure <span className="highlight">improved quality of life</span> throughout the entire
            treatment.
          </p>
        </div>
      </div>

      <div className="section">
        <h3>Treatment</h3>
        <p>
          <span className="highlight">Blepharitis is usually a long-term condition</span>. Most
          people experience <span className="highlight">repeated episodes</span>, separated by
          periods without symptoms. It <span className="highlight">can't usually be cured</span>, but
          a <span className="highlight">daily eyelid-cleaning routine</span> can help{" "}
          <span className="highlight">control symptoms</span> and{" "}
          <span className="highlight">prevent permanent scarring</span> of the eyelid margins.
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
          More severe cases may require <span className="highlight">antibiotics</span> that are either{" "}
          <span className="highlight">applied directly to the eye/eyelid</span> or{" "}
          <span className="highlight">taken as tablets</span>.
        </p>

        <p>
          For <span className="highlight">posterior blepharitis</span>, long-term oral{" "}
          <span className="highlight">tetracycline, minocycline, or doxycycline</span> is more
          effective than topical antibiotics, especially for patients with{" "}
          <span className="highlight">rosacea</span>. As little as{" "}
          <span className="highlight">one pill twice a week</span> can maintain a relatively good
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

      <FooterPage/>
    </div>

    
  );
}