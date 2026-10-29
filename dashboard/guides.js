// Gabay Aralin content, copied from the Figma frames (section 4646:1086, "Kuwento 1").
// Each story id matches a key in LESSONS (dashboard.js). Section tone picks the header colour.
// In lists, class="is-answer" marks the highlighted answer the frame shows in bold.
window.KUWENTURO_GUIDES = {
  'ang-pamilyang-puno-ng-pagmamahal': {
    thumb: 'thumb-ang-pamilyang-puno-ng-pagmamahal.jpg',
    paksa: 'Pagmamahalan, Pag-aaruga, at Pagkakaunawaan sa Pamilya',
    aral: 'Mahalaga ang pagmamahalan sa pamilya upang manatili itong nagkakaisa.',
    salita: 104,
    vocab: [
      ['Pamilya', 'Mga taong nagmamahalan at nag-aalaga sa isa\'t isa.'],
      ['Barangay', 'Lugar kung saan nakatira ang mga tao at pamilya.'],
      ['Nagtaka', 'Nag-isip kung bakit o paano nangyari ang isang bagay.'],
      ['Umiling', 'Paggalaw ng ulo upang ipakita ang hindi pagpayag o hindi pagsang-ayon.'],
      ['Naunawaan', 'Naintindihan ang isang bagay.'],
    ],

    // Figma 4595:44090 BAGO BASAHIN
    'bago-basahin': [
      {
        title: 'Misyon', tone: 'green',
        html: `<p>Alamin na may iba’t ibang uri ng pamilya at tuklasin na ang pagmamahal, pag-aalaga, at pagtanggap ang mahalagang bumubuo sa isang pamilya.</p>`,
      },
      {
        title: 'Layunin', tone: 'yellow',
        html: `<p>Sa pagtatapos ng aralin, inaasahang matutukoy ng mga mag-aaral:</p>
          <ul>
            <li>Ang mga detalye ng kuwento na nagpapakita ng pagmamahal at pag-aalaga ng pamilya.</li>
            <li>Ang aral ng kuwento tungkol sa pagtanggap at paggalang sa iba’t ibang uri ng pamilya.</li>
            <li>Ang mga pangunahing tauhan, tagpuan, at mahahalagang pangyayari sa kuwento.</li>
            <li>Ang pagkakasunod-sunod ng mahahalagang pangyayari mula simula, gitna, at wakas.</li>
          </ul>`,
      },
      {
        title: 'Hulaan', tone: 'red',
        html: `<p>Batay sa pamagat at larawan, tungkol saan kaya ang kwento?</p>
          <ul>
            <li class="is-answer">Matutuklasan ni Biboy na kahit iba ang pamilya ni Popoy, puno pa rin ito ng pagmamahal.</li>
            <li>Matutuklasan ni Biboy na kinakahiya ni Popoy ang kanyang pamilya.</li>
            <li>Matutuklasan ni Biboy na walang pamilyang nag-aalaga kay Popoy.</li>
          </ul>`,
      },
    ],

    // Figma 4595:44117 BASAHIN
    basahin: [
      {
        title: 'Ang Pamilyang Puno ng Pagmamahal', tone: 'green',
        html: `<p>Habang naglalakad sa aming barangay, nakita ko ang kaibigan kong si Popoy.</p>
          <p>“Popoy! Papasok ka na ba sa paaralan? Sabay na tayo!” tawag ko.</p>
          <p>“Hindi. Aalis kami ng mga mama ko,” sagot niya.</p>
          <p>“Mga mama? Hindi ba mama at papa ang bumubuo ng pamilya?” pagtataka ko.</p>
          <p>Umiling si Popoy. “Dalawa ang mama ko. Inaalagaan nila ako kapag may sakit, niyayakap kapag malungkot, at tinutulungan kapag nahihirapan. Mahal na mahal nila ako.”</p>
          <p>Lumabas ang dalawang mama niya at niyakap siya.</p>
          <p>Napangiti ako.</p>
          <p>Doon ko naunawaan.</p>
          <p>Magkaiba man ang pamilya namin, pareho naman kaming minamahal.</p>
          <p><strong><em>Hindi kailangang magkapareho ang mga pamilya, basta’t puno ng pagmamahal.</em></strong></p>`,
      },
    ],

    // Figma 4595:44133 PAGKATAPOS BASAHIN
    'pagkatapos-basahin': [
      {
        title: 'Tuklasin', tone: 'green',
        html: `<h4>Tauhan</h4>
          <ol start="1"><li>Si Popoy ay mayroong dalawang mama (Tauhan ba sila sa kuwento?)</li></ol>
          <p class="answer"><strong>SAGOT:</strong><br><strong>Piliin ang “OPO”</strong><br><strong><em>“Dalawa talaga ang mama ko”</em> kabilang sila sa mga tauhan ng kwento.</strong></p>
          <h4>Tagpuan</h4>
          <ol start="2"><li>Habang naglalakad sa baranggay, nakita ni Biboy si Popoy</li></ol>
          <p class="answer"><strong>SAGOT:</strong><br><strong>Piliin ang “OPO”</strong><br><strong><em>“Habang naglalakad sa aming barangay”</em> Tagpuan ito sa kwento.</strong></p>
          <h4>Pangyayari</h4>
          <ol start="3"><li>Sa tuwing nalulungkot si Popoy, niyayakap, siya ng kanyang mga magulang (Pangyayari ba ito sa kuwento?)</li></ol>
          <p class="answer"><strong>SAGOT:</strong><br><strong>Piliin ang “OPO”</strong><br><strong><em>“Kapag malungkot ako, niyayakap nila ako.”</em> Pangyayari ito sa kuwento.</strong></p>
          <ol start="4"><li>Sa tuwing nalulungkot si Popoy, niyayakap, siya ng kanyang mga magulang (Pangyayari ba ito sa kuwento?)</li></ol>
          <p class="answer"><strong>SAGOT:</strong><br><strong>Piliin ang “OPO”</strong><br><strong><em>“Kapag malungkot ako, niyayakap nila ako.”</em> Pangyayari ito sa kuwento.</strong></p>
          <ol start="5"><li>Inaalagaan ng mga magulang si Popoy sa tuwing may sakit siya (Pangyayari ba ito sa kuwento?)</li></ol>
          <p class="answer"><strong>SAGOT:</strong><br><strong>Piliin ang “OPO”</strong><br><strong><em>“Kapag may sakit ako, inaalagaan nila ako.”</em> Pangyayari ito sa kuwento.</strong></p>
          <ol start="6"><li>Kapag nahihirapan si Popoy, tinutulungan siya ng kanyang mga magulang (Pangyayari ba ito sa kuwento?)</li></ol>
          <p class="answer"><strong>SAGOT:</strong><br><strong>Piliin ang “OPO”</strong><br><strong><em>“Kapag nahihirapan ako, tinutulungan nila ako.”</em> Pangyayari ito sa kuwento.</strong></p>
          <ol start="7"><li>Hindi tanggap ni Popoy ang kanyang mga magulang kaya tinago niya ito kay Biboy (Pangyayari ba ito sa kuwento?)</li></ol>
          <p class="answer"><strong>SAGOT:</strong><br><strong>Piliin ang “HINDI PO”</strong><br><strong><em>“Mahal na mahal ko rin sila”</em> Mahal ni Biboy ang kanyang mga magulang.</strong></p>
          <h4>Aral</h4>
          <ol start="8"><li>Natutunan ni Biboy na ang tunay na pamilya ay punong-puno ng pagmamahal (Aral ba ito sa kuwento?)</li></ol>
          <p class="answer"><strong>SAGOT:</strong><br><strong>Piliin ang “OPO”</strong><br><strong><em>“Dahil ang tunay na pamilya ay punong-puno ng pagmamahal”</em></strong></p>
          <ol start="9"><li>Natutunan ni Biboy na ang tunay na pamilya ay binubuo lamang ng nanay at tatay (Aral ba ito sa kuwento?)</li></ol>
          <p class="answer"><strong>SAGOT:</strong><br><strong>Piliin ang “HINDI PO”</strong><br><strong><em>“Hindi mahalaga kung sino ang kasama sa pamilya”</em> Magkakaiba ang pamilya.</strong></p>`,
      },
      {
        title: 'Suriin', tone: 'yellow',
        html: `<h4>Tauhan</h4>
          <ol start="1"><li>Sino-sino ang mga tauhan na ipinakilala sa kuwento?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Biboy, Popoy, at ang dalawang mama ni Popoy</p>
          <h4>Tagpuan</h4>
          <ol start="2"><li>Saang lugar naglalakad si Popoy nang makita niya si Biboy?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Sa barangay / Sa bahay ni Popoy</p>
          <h4>Pangyayari</h4>
          <ol start="3"><li>Ano ang ginawa ni Biboy noong nakita niya si Popoy?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Tinawag ni Biboy si Popoy / Niyaya ni Biboy si Popoy na sabay silang pumasok sa paaralan</p>
          <ol start="4"><li>Ano ang nalaman ni Biboy tungkol sa mga magulang ni Popoy?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Nalaman ni Biboy na dalawa ang mama ni Popoy</p>
          <ol start="5"><li>Paano ipinakita ng mga magulang ang kanilang pagmamahal?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Kapag nalulungkot siya; <em>Niyayakap</em>, Kapag may sakit siya; <em>Inaalagaan</em>, Kapag nahihirapan siya; <em>Tinutulungan</em></p>
          <h4>Aral</h4>
          <ol start="6"><li>Ano ang natutunan ni Popoy tungkol sa pamilya?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Ang tunay na pamilya ay punong-puno ng pagmamahal / Iba-iba ang bawat pamilya</p>`,
      },
      {
        title: 'Paglalagom', tone: 'red',
        html: `<h4>Simula</h4>
          <ol start="1"><li>Ano ang unang nalaman ni Biboy tungkol sa pamilya ni Popoy na ikinagulat niya?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Nalaman ni Biboy na may dalawang mama si Popoy. Nagtaka siya dahil iba ito sa kaniyang inaasahang pamilya.</p>
          <h4>Gitna</h4>
          <ol start="2"><li>Paano ipinaliwanag ni Biboy na pamilya pa rin ang may dalawang mama?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Ipinaliwanag ni Popoy na tulad din ng ibang pamilya, niyayakap, inaalagaan, tinutulungan, at mahal siya ng kaniyang dalawang mama.</p>
          <h4>Wakas</h4>
          <ol start="3"><li>Ano ang natutuhan ni Biboy tungkol sa tunay na pamilya?</li></ol>
          <p class="answer"><strong>SAGOT:</strong> Natutuhan ni Biboy na maaaring magkakaiba ang anyo ng pamilya. Ang tunay na pamilya ay may pagmamahal, pag-aalaga, at pagtanggap sa isa't isa.</p>
          <h4>Kabuuan</h4>
          <p>Nakita ni Biboy si Popoy habang naglalakad sa kanilang barangay. Nalaman niya na may dalawang mama si Popoy kaya siya ay nagtaka. Ikinuwento ni Popoy na siya ay minamahal, inaalagaan, at tinutulungan ng kanyang mga mama sa iba’t ibang pagkakataon. Habang nakikilala ni Biboy ang pamilya ni Popoy, nakita niya na ang pagmamahal at pag-aalaga ang mahalagang bahagi ng isang pamilya. Sa huli, natutunan ni Biboy na maaaring magkakaiba ang uri ng pamilya, ngunit ang bawat pamilya ay maaaring maging puno ng pagmamahal.</p>`,
      },
      {
        title: 'Totoong Buhay', tone: 'blue',
        html: `<p class="question">May kaklase kang nagsabi, “Dalawa lang kami sa bahay, ako at ang tatay ko.” Ano ang magandang sagot?</p>
          <ul>
            <li>“Mas masaya kaya kapag buo ang pamilya.”</li>
            <li>“Lahat ng pamilya ay kinakailangan ng nanay.”</li>
            <li class="is-answer">“Ang mahalaga ay masaya at nagmamahalan kayo.”</li>
          </ul>
          <p class="question">May kaklase kang ang tito at tita ang kasama niya sa “Family Day” dahil wala roon ang kaniyang mga magulang. Ano ang sasabihin mo?</p>
          <ul>
            <li>“Sayang naman, hindi ka sinamahan ng mga magulang mo.”</li>
            <li class="is-answer">“Pamilya mo rin naman sila at mahal ka nila.”</li>
            <li>“Hindi kabilang sa ‘Family Day’ ang mga tito at tita.”</li>
          </ul>
          <p class="question">Ikinuwento ng kaklase mo na inaalagaan siya ng kaniyang lola dahil wala ang mga magulang niya. Ano ang sasabihin mo?</p>
          <ul>
            <li class="is-answer">“Mabuti at may nag-aalaga sa iyo at nagmamahal sa iyo.”</li>
            <li>“Hindi mo tunay na pamilya ang lola mo.”</li>
            <li>“Mas maganda ang pamilya ko kaysa sa iyo.”</li>
          </ul>`,
      },
    ],
  },
};
