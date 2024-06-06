import React from 'react';

const JoinUs = () => {
    return (
        <>
            <section>
            <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row-reverse">
    <div className="text-center lg:text-left">
      <img className='w-[180%]' src='/public/Humaaans.png' alt="" />
    </div>
    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body">
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Reason to join us</span>
          </label>
          <textarea placeholder="Describe" className="textarea textarea-bordered textarea-md w-full max-w-xs" ></textarea>
        </div>
        <div className="form-control mt-6">
          <button className="btn text-white bg-gradient-to-br to-teal-400 from-emerald-500 font-bold">Send</button>
        </div>
      </form>
    </div>
  </div>
</div>
            </section>
        </>
    );
};

export default JoinUs;