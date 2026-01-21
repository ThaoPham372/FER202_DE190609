function Footer({myProfile}) {
  return (
    <footer className="ph-footer">
      <div>
        {/* hiển thị thông tin Avatar, Name và Email */}
        <img src={myProfile.avatar} alt="Avatar"
          style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
        <h5>{myProfile.name}</h5>
        <p>{myProfile.email}</p>
      </div>
    </footer>
  );
}
export default Footer;