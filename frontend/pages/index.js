import { useEffect, useState } from 'react';

export default function Home() {
  const [form, setForm] = useState({
    name: '',
    speciality: '',
    experience: '',
    gender: '',
    location: '',
    languages: '',
    consultationFee: '',
    image: '',
  });

  const [doctors, setDoctors] = useState([]);
  const [filters, setFilters] = useState({ gender: '', location: '', speciality: '' });
  const [page, setPage] = useState(1);
  const limit = 5;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddDoctor = async () => {
    try {
      const res = await fetch('https://doctorprofile.onrender.com/api/add-doctor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          languages: form.languages.split(',').map((lang) => lang.trim()),
          experience: Number(form.experience),
          consultationFee: Number(form.consultationFee),
        }),
      });

      if (res.ok) {
        alert('Doctor added!');
        // Reset form after successful submission
        setForm({
          name: '',
          speciality: '',
          experience: '',
          gender: '',
          location: '',
          languages: '',
          consultationFee: '',
          image: '',
        });
        fetchDoctors(); // Refresh list
      }
    } catch (err) {
      console.error(err);
      alert('Failed to add doctor');
    }
  };

  const fetchDoctors = async () => {
    const query = new URLSearchParams({
      page,
      limit,
      ...filters,
    }).toString();

    const res = await fetch(`https://doctorprofile.onrender.com/api/list-doctor-with-filter?${query}`);
    const data = await res.json();
    setDoctors(data.doctors);
  };

  useEffect(() => {
    fetchDoctors();
  }, [filters, page]);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4 text-gray-900">
      <h1 className="text-3xl font-bold text-center mb-10 text-cyan-600">🩺Apollo</h1>

      {/* Add Doctor Form */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Add Doctor</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" value={form.name} placeholder="Name" className="p-2 border rounded text-gray-900" onChange={handleChange} />
          <input name="speciality" value={form.speciality} placeholder="Speciality" className="p-2 border rounded text-gray-900" onChange={handleChange} />
          <input name="gender" value={form.gender} placeholder="Gender" className="p-2 border rounded text-gray-900" onChange={handleChange} />
          <input name="location" value={form.location} placeholder="Location" className="p-2 border rounded text-gray-900" onChange={handleChange} />
          <input name="image" value={form.image} placeholder="Image URL" className="p-2 border rounded text-gray-900" onChange={handleChange} />
          <input name="experience" value={form.experience} placeholder="Experience (years)" className="p-2 border rounded text-gray-900" onChange={handleChange} />
          <input name="languages" value={form.languages} placeholder="Languages (comma separated)" className="p-2 border rounded text-gray-900" onChange={handleChange} />
          <input name="consultationFee" value={form.consultationFee} placeholder="Consultation Fee" className="p-2 border rounded text-gray-900" onChange={handleChange} />
        </div>
        <button onClick={handleAddDoctor} className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          + Add Doctor
        </button>
      </div>

      {/* Filters */}
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-4 mb-6">
        <input
          type="text"
          placeholder="Filter by gender"
          className="p-2 border rounded text-gray-900"
          onChange={(e) => setFilters((prev) => ({ ...prev, gender: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Filter by location"
          className="p-2 border rounded text-gray-900"
          onChange={(e) => setFilters((prev) => ({ ...prev, location: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Filter by speciality"
          className="p-2 border rounded text-gray-900"
          onChange={(e) => setFilters((prev) => ({ ...prev, speciality: e.target.value }))}
        />
      </div>

      {/* Doctor List */}
      <div className="max-w-4xl mx-auto space-y-4">
        {doctors.map((doc, idx) => (
          <div key={idx} className="bg-white p-4 rounded shadow flex items-start gap-4">
            <img src={doc.image} alt={doc.name} className="w-24 h-24 object-cover rounded" />
            <div>
              <h3 className="text-xl font-bold">{doc.name}</h3>
              <p><strong>Speciality:</strong> {doc.speciality}</p>
              <p><strong>Experience:</strong> {doc.experience} years</p>
              <p><strong>Location:</strong> {doc.location}</p>
              <p><strong>Gender:</strong> {doc.gender}</p>
              <p><strong>Languages:</strong> {doc.languages.join(', ')}</p>
              <p><strong>Fee:</strong> ₹{doc.consultationFee}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="max-w-4xl mx-auto mt-6 flex justify-center gap-4">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          className="px-4 py-2 bg-gray-400 text-white rounded"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
