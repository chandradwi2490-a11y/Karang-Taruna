
        // JavaScript untuk interaktivitas
        document.addEventListener('DOMContentLoaded', function() {
            // Animasi scroll untuk navigasi
            document.querySelectorAll('nav a').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    window.scrollTo({
                        top: targetElement.offsetTop - 20,
                        behavior: 'smooth'
                    });
                });
            });
            
            // Form submission dengan kirim data ke WhatsApp admin
            const registrationForm = document.getElementById('registrationForm');
            if (registrationForm) {
                registrationForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    
                    // Ambil nilai form
                    const name = document.getElementById('name').value.trim();
                    const age = document.getElementById('age').value.trim();
                    const address = document.getElementById('address').value.trim();
                    const phone = document.getElementById('phone').value.trim();
                    const interest = document.getElementById('interest').value.trim();
                    
                    // Validasi sederhana (bisa dikembangkan)
                    if (!name || !age || !address || !phone || !interest) {
                        alert('Mohon lengkapi semua data pendaftaran.');
                        return;
                    }
                    
                    // Buat pesan WA (encode URI)
                    const adminNumber = '+62 857-3014-0801'; // Ganti dengan nomor admin Anda
                    const message = `Pendaftaran Anggota Karang Taruna:%0A` +
                                    `Nama: ${encodeURIComponent(name)}%0A` +
                                    `Usia: ${encodeURIComponent(age)}%0A` +
                                    `Alamat: ${encodeURIComponent(address)}%0A` +
                                    `Nomor Telepon: ${encodeURIComponent(phone)}%0A` +
                                    `Minat & Bakat: ${encodeURIComponent(interest)}`;
                    
                    // URL WhatsApp API
                    const waURL = `https://wa.me/${adminNumber}?text=${message}`;
                    
                    // Buka link WA di tab baru
                    window.open(waURL, '_blank');
                    
                    // Tampilkan alert sukses
                    alert(`Terima kasih ${name}! Data pendaftaran Anda telah dikirim ke admin via WhatsApp.`);
                    
                    // Reset form
                    registrationForm.reset();
                });
            }
            
            // Animasi elemen saat scrolling
            const animatedElements = document.querySelectorAll('.animated');
            
            function checkScroll() {
                animatedElements.forEach(element => {
                    const elementPosition = element.getBoundingClientRect().top;
                    const screenPosition = window.innerHeight / 1.3;
                    
                    if (elementPosition < screenPosition) {
                        element.style.opacity = 1;
                        element.style.transform = 'translateY(0)';
                    }
                });
            }
            
            // Set initial state for animated elements
            animatedElements.forEach(element => {
                element.style.opacity = 0;
                element.style.transform = 'translateY(20px)';
                element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            });
            
            // Check scroll on load and scroll
            checkScroll();
            window.addEventListener('scroll', checkScroll);
            
            // Fitur sederhana untuk menampilkan tanggal dan waktu
            function updateDateTime() {
                const now = new Date();
                const options = { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                };
                const dateTimeStr = now.toLocaleDateString('id-ID', options);
                
                // Cari elemen untuk menampilkan tanggal, jika ada
                const dateTimeElement = document.getElementById('datetime');
                if (!dateTimeElement) {
                    // Buat elemen jika belum ada
                    const newDateTimeElement = document.createElement('div');
                    newDateTimeElement.id = 'datetime';
                    newDateTimeElement.style.textAlign = 'center';
                    newDateTimeElement.style.margin = '10px 0';
                    newDateTimeElement.style.color = '#2196F3';
                    newDateTimeElement.style.fontWeight = 'bold';
                    newDateTimeElement.textContent = dateTimeStr;
                    
                    // Sisipkan setelah judul hero section
                    const heroSection = document.querySelector('.hero');
                    if (heroSection) {
                        heroSection.appendChild(newDateTimeElement);
                    }
                } else {
                    dateTimeElement.textContent = dateTimeStr;
                }
            }
            
            // Update tanggal dan waktu setiap menit
            updateDateTime();
            setInterval(updateDateTime, 60000);
        });
    