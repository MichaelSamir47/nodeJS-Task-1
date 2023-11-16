
function Posts(x){
const postsArray = [];
// function getRandomInt(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }
const titles = [
  "Mechanical Engineer",
  "Civil Engineer",
  " Electrical Engineer",
  "Software Engineer",
  "Environmental Engineer",
  "Biomedical Engineer",
];
const descriptions = [
  "As a highly skilled and detail-oriented Mechanical Engineer, I am dedicated to pushing the boundaries of innovation in the field of mechanical design and manufacturing. With a strong background in conceptualizing, designing, and testing mechanical systems, I bring a passion for problem-solving and a commitment to delivering high-quality solutions. My expertise lies in utilizing cutting-edge technology and industry best practices to optimize product performance and efficiency. I thrive in dynamic environments where I can apply my analytical skills to overcome challenges and contribute to the development of groundbreaking engineering solutions. Known for my collaborative approach, I effectively communicate complex technical concepts to cross-functional teams, fostering a culture of teamwork and success. I am driven by a relentless pursuit of excellence and a genuine enthusiasm for creating solutions that shape the future of engineering.",
  "Civil engineers are responsible for designing, planning, and overseeing the construction of infrastructure projects such as roads, bridges, buildings, and water supply systems. They ensure the efficient use of resources while considering environmental and sustainability factors.",
  "Electrical engineers work with electricity, electronics, and electromagnetism. They design, develop, and maintain electrical systems, including power generation, transmission, and electronic devices. This field encompasses everything from circuit design to power distribution.",
  "Software engineers develop and maintain software applications, systems, and platforms. They are proficient in programming languages and collaborate to create solutions ranging from mobile apps to complex enterprise software.",
  "Environmental engineers focus on developing solutions to environmental problems. They work on issues such as water and air pollution, waste management, and sustainable development, aiming to create solutions that protect both human health and the environment.",
  "Biomedical engineers combine principles from engineering and biology to develop technologies and devices that improve healthcare. They work on projects like medical imaging devices, prosthetics, and biotechnology applications."
];
 for (let i = 0; i < 7; i++) {
  const post = {
    // title: titles[getRandomInt(0, titles.length - 1)],?
    // description: descriptions[getRandomInt(0, descriptions.length - 1)],
    title: titles[i],
    description: descriptions[i],
  };
  postsArray.push(post);
}
console.log(x,"<--",postsArray[x-1])
  return postsArray[x-1]
}
module.exports = Posts ;






