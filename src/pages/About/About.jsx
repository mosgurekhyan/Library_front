import './About.css'
import header from '../../assets/images/library.png'

function About() {
  return (
    <div className='about'>
      <img src={header} alt="" className="about_header_img" />
      <div className="about_items">
        <img src={header} alt="" className="about_items_img about_items_first_img" />
        <img src={header} alt="" className="about_items_img about_items_second_img" />
        <div className="about_rectangle"></div>
        <p className="about_items_text">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quaerat est doloribus voluptates magni, ullam cupiditate nobis accusantium nisi minus alias, numquam hic vitae atque dignissimos tempore facere. Quis obcaecati quisquam odio non? Eveniet, sunt nemo laborum rerum omnis deserunt ab a, voluptatibus dicta voluptates consectetur recusandae pariatur tempora, doloribus fugiat et quasi. Esse temporibus eaque quasi minus eveniet sint, distinctio optio reiciendis tenetur ullam consectetur deleniti rerum officiis, nemo quae! Ipsam cum nihil iure reiciendis voluptatem delectus sit fugit possimus amet fugiat in doloribus, vitae quaerat dicta velit non necessitatibus voluptas rerum illo. Dignissimos autem repellat soluta expedita ut rerum delectus amet iste, modi vel nostrum cupiditate suscipit nobis obcaecati blanditiis reprehenderit eos placeat perspiciatis nesciunt qui maiores. Tenetur, aliquam.</p>
      </div>
      <section className="about_section">
        <img src={header} alt="" className="about_section_img" />
        <p className="about_section_text">Lorem ipsum dolor sit amet consectetur adipisicing elit. A, voluptate! Odit, nihil omnis iste et nisi explicabo voluptate illum minus velit, eveniet, harum vel unde! Quibusdam dolorem, blanditiis dicta velit possimus beatae! Tempore, odit magnam soluta amet culpa explicabo veniam, sequi expedita libero voluptatem cumque nobis aperiam quasi in possimus, ad eveniet. Nisi modi provident consequatur. Totam sit earum commodi sint quaerat blanditiis enim et delectus, assumenda, harum sunt nam odio hic quo facilis quasi dignissimos odit beatae aspernatur veritatis adipisci! Repellat unde ad quisquam recusandae, aliquid voluptatibus impedit ullam dolorem alias officiis esse quasi tenetur reprehenderit sunt eum ex.</p>
      </section>
      <iframe className='about_map' src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.7611364232853!2d44.47381407581566!3d40.1921289714766!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd75b7676c6d%3A0x8ac5679168841ecf!2z0KDQvtGB0YHQuNC50YHQutC40Lkg0Y3QutC-0L3QvtC80LjRh9C10YHQutC40Lkg0YPQvdC40LLQtdGA0YHQuNGC0LXRgiDQuNC80LXQvdC4INCTLiDQki4g0J_Qu9C10YXQsNC90L7QstCw!5e0!3m2!1sru!2sam!4v1742015117569!5m2!1sru!2sam" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
    </div>
  )
}

export default About