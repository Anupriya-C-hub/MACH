// import React, { useState, useEffect, useMemo } from 'react';
// import axios from 'axios';
// import Select from 'react-select';
// import '../styles/replacement.css'; // Import your CSS file for styles

// const FilteredCount = ({ count }) => {
//   return (
//     <div>
//       <h3>Number of People: {count}</h3>
//     </div>
//   );
// };

// const SkillTable = ({ skills }) => {
//   return (
//     <div className="skill-table">
//       <h2>Employee Skills</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Skill</th>
//             <th>Rating</th>
//           </tr>
//         </thead>
//         <tbody>
//           {Object.entries(skills).map(([skill, rating]) => (
//             <tr key={skill}>
//               <td>{skill}</td>
//               <td>{rating}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// function ReplacementFinder() {
//   const [nearestMatches, setNearestMatches] = useState([]);
//   const [filteredMatches, setFilteredMatches] = useState([]);
//   const [selectedName, setSelectedName] = useState([]);
//   const [selectedAccount, setSelectedAccount] = useState([]);
//   const [selectedDesignation, setSelectedDesignation] = useState([]);
//   const [selectedSkills, setSelectedSkills] = useState([]);
//   const [skillAvgRatings, setSkillAvgRatings] = useState({});
//   const [filteredSkills, setFilteredSkills] = useState({});
//   const [ratingFilter, setRatingFilter] = useState(0); // State to manage rating filter

//   const [dropdownOptions, setDropdownOptions] = useState({
//     names: [],
//     accounts: [],
//     designations: [],
//     skills: [],
//   });

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://127.0.0.1:8000/mach/replacement_finder/?");
//       const { skill_avg_ratings, nearest_matches } = response.data;

//       setNearestMatches(nearest_matches);

//       const designations = Array.from(new Set(nearest_matches.map(item => item.designation))).sort();
//       const names = Array.from(new Set(nearest_matches.map(item => item.name))).sort();
//       const accounts = Array.from(new Set(nearest_matches.map(item => item.account))).sort();
//       const skills = Object.keys(skill_avg_ratings).sort();

//       setDropdownOptions({ designations, names, accounts, skills });
//       setFilteredMatches(nearest_matches);
//       setSkillAvgRatings(skill_avg_ratings);
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   const clearAllFilters = () => {
//     setSelectedDesignation([]);
//     setSelectedAccount([]);
//     setSelectedSkills([]);
//     setSelectedName([]);
//     setRatingFilter(0); // Reset rating filter
//   };

//   const applyFilters = () => {
//     let filteredResult = [...nearestMatches];
  
//     if (selectedName.length > 0) {
//       filteredResult = filteredResult.filter(item => item.name !== selectedName[0]);
//     }
  
//     if (selectedAccount.length > 0) {
//       filteredResult = filteredResult.filter(item => selectedAccount.includes(item.account));
//       const filteredEmployee = filteredResult.find(employee => employee.account === selectedAccount[0]);
//       setFilteredSkills(filteredEmployee ? filteredEmployee.skills[0] : {});
//     }
  

  
//     if (selectedDesignation.length > 0) {
//       filteredResult = filteredResult.filter(item => selectedDesignation.includes(item.designation));
//     }

//     if (selectedSkills.length > 0) {
//       filteredResult = filteredResult.filter(item =>
//         selectedSkills.every(skill =>
//           item.skills.some(skillObj => Object.keys(skillObj)[0] === skill)
//         )
//       );
//     }

//     if (ratingFilter > 0) {
//       filteredResult = filteredResult.filter(item =>
//         item.skills.some(skillObj => {
//           const skill = Object.keys(skillObj)[0];
//           const rating = skillObj[skill];
//           return rating === ratingFilter;
//         })
//       );
//     }

//     filteredResult.sort((a, b) => b.average_rating - a.average_rating);

//     setFilteredMatches(filteredResult);
//   };

//   const handleDropdownChange = (selectedOptions, action) => {
//     const { name } = action;
//     const selectedValues = selectedOptions.map(option => option.value);
  
//     switch (name) {
//       case 'names':
//         setSelectedName(selectedValues);
//         const selectedEmployee = nearestMatches.find(employee => employee.name === selectedValues[0]);
//         setFilteredSkills(selectedEmployee ? selectedEmployee.skills[0] : {});
//         break;
//       case 'accounts':
//         setSelectedAccount(selectedValues);
//         const filteredEmployee = nearestMatches.find(employee => employee.account === selectedValues[0]);
//         setFilteredSkills(filteredEmployee ? filteredEmployee.skills[0] : {});
//         break;
//       case 'designations':
//         setSelectedDesignation(selectedValues);
//         const newEmployee = nearestMatches.find(employee => employee.account === selectedValues[0]);
//         setFilteredSkills(newEmployee ? newEmployee.skills[0] : {});
//         break;
//       case 'skills':
//         setSelectedSkills(selectedValues);
//         break;
//       default:
//         break;
//     }
//   };
  
//   useEffect(() => {
//     applyFilters();
//   }, [selectedName, selectedAccount, selectedDesignation, selectedSkills, ratingFilter]);

//   // Memoized sorted users
//   const sortedUsers = useMemo(() => {
//     return [...filteredMatches].sort((a, b) => b.average_rating - a.average_rating);
//   }, [filteredMatches]);

//   const handleRatingFilterChange = (rating) => {
//     setRatingFilter(rating);
//   };

//   const handleResetFilters = () => {
//     clearAllFilters();
//   };

//   return (
//     <div className="replacement-finder">
//       <div className="filters-container">
//         <Select
//           isMulti
//           name="names"
//           placeholder="Select Names"
//           options={dropdownOptions.names.map(name => ({ value: name, label: name }))}
//           value={selectedName.map(name => ({ value: name, label: name }))}
//           onChange={handleDropdownChange}
//         />
//         <Select
//           isMulti
//           name="accounts"
//           placeholder="Select Accounts"
//           options={dropdownOptions.accounts.map(account => ({ value: account, label: account }))}
//           value={selectedAccount.map(account => ({ value: account, label: account }))}
//           onChange={handleDropdownChange}
//         />
//         <Select
//           isMulti
//           name="designations"
//           placeholder="Select Designations"
//           options={dropdownOptions.designations.map(designation => ({ value: designation, label: designation }))}
//           value={selectedDesignation.map(designation => ({ value: designation, label: designation }))}
//           onChange={handleDropdownChange}
//         />
//         <Select
//           isMulti
//           name="skills"
//           placeholder="Select Skills"
//           options={dropdownOptions.skills.map(skill => ({ value: skill, label: skill }))}
//           value={selectedSkills.map(skill => ({ value: skill, label: skill }))}
//           onChange={handleDropdownChange}
//         />
        
//         <div className='buttons'>
//           <button onClick={() => handleRatingFilterChange(5)}>Master</button>
//           <button onClick={() => handleRatingFilterChange(4)}>Expert</button>
//           <button onClick={() => handleRatingFilterChange(3)}>Advanced</button>
//           <button onClick={() => handleRatingFilterChange(2)}>Intermediate</button>
//           <button onClick={() => handleRatingFilterChange(1)}>Beginner</button>
//           <button onClick={handleResetFilters} className="clear-button">Reset</button>
//         </div>
      
//       </div>

//       <FilteredCount count={filteredMatches.length} />

//       <div className="tables">
//         <div className="employee-table">
//           <h2>Potential Replacements</h2>
//           <table>
//             <thead>
//               <tr>
//                 <th>Name</th>
//                 <th>Designation</th>
//                 <th>Account</th>
//                 <th>Matching skills</th>
//                 <th>Average Rating</th>
//               </tr>
//             </thead>
//             <tbody>
//               {sortedUsers.length > 0 ? (
//                 sortedUsers.map(item => (
//                   <tr key={item.user_id}>
//                     <td>{item.name}</td>
//                     <td>{item.designation}</td>
//                     <td>{item.account}</td>
//                     <td>{item.matching_skills}</td>
//                     <td>{item.average_rating}</td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="5">No matching data found.</td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="skill-table">
//           <SkillTable skills={Object.keys(filteredSkills).length > 0 ? filteredSkills : skillAvgRatings} />
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ReplacementFinder;
